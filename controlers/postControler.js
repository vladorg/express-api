import { json } from 'express';
import Post from '../models/Post.js'
import User from '../models/User.js';
import { checkAdmin } from '../utils.js';

export const getAll = async (req, res) => {
  try {
    let posts;
    const { authorId } = req.query;

    if (authorId) {
      posts = await Post.find({ "author.id": authorId});
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

export const getOne = async (req, res) => {
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

export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { user: login, userId: id } = req.userInfo;

    const dateS = new Date().toString().split(' ');
    const date = `${dateS[1]} ${dateS[2]}, ${dateS[3]}`;

    const { name, role } = await User.findById(id);

    const { title: newTitle, _id: newId } = await Post.create({ 
      title, 
      content, 
      date, 
      author: { 
        name, 
        role: role || "", 
        id, 
        login 
      } 
    });

    res.json({
      message: 'ok',
      title: newTitle,
      id: newId
    });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
}

export const updatePost = async (req, res) => {
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

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = await checkAdmin(req);

    console.log(isUser);

    if (isAdmin) {
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
    } else {
      res.status(500).send({ message: 'You are not Admin!' });
    }

  } catch(err) {
    res.status(500).send({ message: err.message });
  }
}
