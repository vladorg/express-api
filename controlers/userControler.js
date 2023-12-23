import User from '../models/User.js'

export const getUserInfo = async (req, res) => {
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


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.name || req.body.role) {    
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})

      res.json({
        message: 'ok',
        updatedUser
      })
    } else {
      res.status(400).send({ message: 'Failed update: no data' })
    }

  } catch(err) {
    res.status(500).send({ message: err.message });
  }
}
