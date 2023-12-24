import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const checkAdmin = async (req, res, next) => {
  // this middleware checking admin

  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'admin: no token' } );
      return
    }

    const ver = jwt.verify(token, process.env.SECRET_KEY);

    if (!ver) {
      res.status(401).json({ message: 'admin: invalid token' } );
      return
    }

    const { userId } = ver;
    const user = await User.findById(userId);

    if (ver.userLevel !== 1) {
      res.status(403).json({ message: 'admin: forbidden!' } );
      return
    }

    next();
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'admin: failed' } );
  }
}
