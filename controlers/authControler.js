import bcrypt from 'bcryptjs';
import { regValidator } from '../utils.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { login, password, name, role } = req.body;
    const isNotValid = regValidator(login, password);
    const defaultName = 'Unnamed user';
    const defaultRole = '';
    const defaultLevel = 2;

    if (isNotValid) {
      return res.status(403).json({ message: isNotValid } );
    }

    const candidate = await User.findOne({login}); // check repeat login 

    if (candidate) {
      return res.status(403).json({ message: 'login is already exists!'} );
    }


    const hashPassword = bcrypt.hashSync(password, 5);
    const reg = await User.create({
      login, 
      password: hashPassword, 
      level: defaultLevel, 
      name: name || defaultName,
      role: role || defaultRole
    });        

    return res.json({ message: 'ok', newUser: reg} );

  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }  
}

export const signin = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: 'need login and password!' } );
    }

    const user = await User.findOne({login}); // check login exists

    if (!user) {
      console.log('user is not exists');
      return res.status(400).json({ message: 'user is not exists!' } );
    }

    const passCompare = bcrypt.compareSync(password, user.password);

    if (!passCompare) {
      return res.status(400).json({ message: 'incorrect password!' } );
    } 

    const token = jwt.sign({ user: user.login, userId: user._id, userLevel: user.level }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_IN });

    console.log(`User ${login} is authorized!`);
    return res.status(200).json({ message: 'Success auth!', token, user: user.login } );

  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
}

export const checkAuth = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const ver = jwt.verify(token, process.env.SECRET_KEY);

    if (!ver) {
      return res.status(401).json({ message: 'unauthorized' } );
    }

    return res.status(200).json({ message: 'ok', info: ver } ); 
    
  } catch(err) {
    return res.status(500).send({ message: err.message });
  }
}
