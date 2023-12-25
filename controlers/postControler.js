import Post from '../models/Post.js'
import User from '../models/User.js';

class postControler {

  async getAll(req, res) {
    try {
      let posts;
      const { authorId } = req.query;
  
      if (authorId) {
        posts = await Post.find({ "authorId": authorId });
      } else {
        posts = await Post.find();
      }
  
      res.json({
        message: 'ok',
        posts
      });
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
  
      res.json({
        message: 'ok', 
        post
      });
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }

  async addPost(req, res) {
    try {
      const { title, content } = req.body;
      const { userId } = req.userInfo;
  
      const dateS = new Date().toString().split(' ');
      const date = `${dateS[1]} ${dateS[2]}, ${dateS[3]}`;
  
      const newPost = await Post.create({ 
        title, 
        content, 
        date, 
        authorId: userId
      });
  
      res.json({
        message: 'ok',
        newPost
      });

    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
  
      if (req.body.title || req.body.content) {    
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true})
  
        res.json({
          message: 'ok',
          updatedPost
        })
      } else {
        res.status(400).send({ message: 'Failed update: no title or content' })
      }
  
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (deletedPost) {
        res.json({
          message: 'ok',
          deletedPost
        })
      } else {
        res.json({
          message: 'post is already deleted!'
        })
      }
  
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default new postControler();
