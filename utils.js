import jwt from 'jsonwebtoken';
import User from './models/User.js';

export const regValidator = (login, password) => {
  try {
    if (!login || !password) {
      throw 'need login and password!';
    }
    
    let invalid = false;
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    const specialsPattern = /\W/;

    // checks
    cyrillicPattern.test(login) ? invalid = "login is can't be cyrillic!" : null;
    cyrillicPattern.test(password) ? invalid = "password is can't be cyrillic!" : null;

    specialsPattern.test(login) ? invalid = "login is can't be include special characters except _" : null;

    login.length < 2 ? invalid = "login length is can't be less than 5!" : null;
    password.length < 2 ? invalid = "password length is can't be less than 5!" : null;

    login.includes(' ') ? invalid = "login is can't be include SPACE!" : null;
    password.includes(' ') ? invalid = "password is can't be include SPACE!" : null;
  
  
    return invalid; 
  } catch(err) {
    console.log(err);

    return err
  }
}

export const checkUser = async (req) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const ver = jwt.verify(token, process.env.SECRET_KEY);

    const { userId } = ver;

    const user = await User.findById(userId);

    return user

  } catch(err) {
    return false
  }
}

export const checkAdmin = async (req) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const ver = jwt.verify(token, process.env.SECRET_KEY);

    const { userId } = ver;

    const user = await User.findById(userId);
    if (user) {
      const { level } = user;

      if (level === 1) {
        return true
      }
    }

    return false

  } catch(err) {
    return false
  }
}
