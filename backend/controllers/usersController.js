const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});
  users.forEach((user) => {
    user.populate('following');
    user.populate('followers');
  })
  res.status(200).json(users);
}

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
  const user = await User.findById(id);
  if (!user) return res.status(400).json({ error: 'No such user' });
  user.populate('following');
  user.populate('followers');
  res.status(200).json(user);
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) return res.status(400).json({ error: 'No such user' });
  res.status(200).json(user);
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) return res.status(400).json({ error: 'No such user' });
  res.status(200).json(user);
}

const follow = async (req, res) => {
  try {
    const { id } = req.params;
    const { followId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: 'No such user' });
    user.populate('following');
    user.populate('followers');
    if (user.following.includes(followId)) return res.status(400).json({ message: 'Already following' });
    user.following.push(followId);
    await user.save();
    res.status(200).json({ message: 'User added to following array' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

const unfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const { followId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: 'No such user' });
    user.populate('following');
    user.populate('followers');
    if (!user.following.includes(followId)) return res.status(400).json({ message: 'Already not following' });
    user.following.splice(user.following.indexOf(followId), 1);
    await user.save();
    res.status(200).json({ message: 'User removed from following array' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow
}