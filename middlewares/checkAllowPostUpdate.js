import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';

export const checkAllowPostUpdate = async (req, res, next) => {
  // who can update post? 
  // - user-author who owns this post
  // - admin level user

  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const { id: postId } = req.params;

    if (!token) {
      res.status(401).json({ message: 'post: no token' } );
      return
    }

    const ver = jwt.verify(token, process.env.SECRET_KEY);

    if (!ver) {
      res.status(401).json({ message: 'user: invalid token' } );
      return
    }

    req.userInfo = ver;

    const postInfo = await Post.findById(postId);

    if (postInfo.authorId != ver.userId && ver.userLevel !== 1) {
      res.status(403).json({ message: 'post: forbidden!' } );
      return
    }

    next();
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'post: failed check!' } );
  }
}
