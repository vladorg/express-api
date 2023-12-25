import User from '../models/User.js'
import Post from '../models/Post.js'
import userPhotoService from '../services/userPhotoService.js';

class userControler {

  async getAll(req, res) {
    try {
      const users = await User.find({}, ['-password', '-__v']);
  
      res.json({
        message: 'ok',
        users
      });
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id, ['-password']);
      
      if (!user) {
        res.status(404).json({ message: "not found" });
        return
      }
  
      res.status(200).json({ message: "ok", user });
  
    } catch(err) {
      return res.status(500).send({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const photoPath = 'http://' + req.headers.host + '/images/users/';  
      let photoName = 'user.jpg';
      let userPhotoPath = photoPath + photoName;    
      
      if (req.files?.photo?.size) {
        photoName = userPhotoService.generateName(req.files?.photo);
        userPhotoPath = photoPath + photoName;
        req.body.photo = userPhotoPath;
      } 
  
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});

      if (req.files?.photo?.size) {
        userPhotoService.saveOnDisc(req.files?.photo, photoName);
      }
  
      res.json({
        message: 'ok',
        updatedUser
      })
  
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (deletedUser) {
        res.json({
          message: 'ok',
          deletedUser
        })
      } else {
        res.json({
          message: 'user is already deleted!'
        })
      }

    } catch(err) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default new userControler();
