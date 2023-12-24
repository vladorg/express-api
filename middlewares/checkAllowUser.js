import jwt from 'jsonwebtoken';

export const checkAllowUser = (req, res, next) => {
  // who can update user info? 
  // - user who owns this info
  // - admin level user

  try {
    const { id } = req.params;

    if (!id) {
      res.status(401).json({ message: 'user: no id' } );
      return
    }

    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'user: no token' } );
      return
    }

    const ver = jwt.verify(token, process.env.SECRET_KEY);

    if (!ver) {
      res.status(401).json({ message: 'user: invalid token' } );
      return
    }

    req.userInfo = ver;

    if (id != ver.userId && ver.userLevel !== 1) {
      res.status(403).json({ message: 'user: forbidden!' } );
      return
    }

    next();
  } catch(err) {
    res.status(500).json({ message: 'user: failed check!' } );
  }
}
