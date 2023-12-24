import jwt from 'jsonwebtoken';

export const checkAuthMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'post: no token' } );
      return
    }

    const ver = jwt.verify(token, process.env.SECRET_KEY);

    if (!ver) {
      res.status(401).json({ message: 'post: invalid token' } );
      return
    }

    req.userInfo = ver;

    next();
  } catch(err) {
    res.status(500).json({ message: 'post: failed auth check' } );
  }
}
