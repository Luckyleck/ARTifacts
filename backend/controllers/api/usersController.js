const mongoose = require('mongoose');
const User = mongoose.model('User');

async function getUsers(req, res) {
  const users = await User.find({}).sort({ createdAt: -1 }).exec();
  for (const user of users) {
    const populatedUser = await User
      .findById(user._id)
      .populate('follows')
      .populate('followers')
      .exec()
    ;
    Object.assign(user, populatedUser._doc);
  }
  res.status(200).json(users);
}

async function getRandomUsers(req, res) {
  const { num } = req.params;
  const users = await User.aggregate([{ $sample: { size: parseInt(num) } }]).exec();
  for (const user of users) {
    const populatedUser = await User
      .findById(user._id)
      .populate('follows')
      .populate('followers')
      .exec()
    ;
    Object.assign(user, populatedUser._doc);
  }
  res.status(200).json(users);
}

async function follow(req, res) {
  const { currentUser, targetUser, action } = req.body;
  try {
    let updatedCurrentUser, updatedTargetUser;
    switch(action) {
      case 'follow':
        [updatedCurrentUser, updatedTargetUser] = await Promise.all([ 
          User.findByIdAndUpdate(currentUser, { $addToSet: { follows: targetUser } }, { new: true }),
          User.findByIdAndUpdate(targetUser, { $addToSet: { followers: currentUser } }, { new: true }).populate('followers')
        ]);
        break;
      case 'unfollow':
        [updatedCurrentUser, updatedTargetUser] = await Promise.all([ 
          User.findByIdAndUpdate(currentUser, { $pull: { follows: targetUser._id } }, { new: true }),
          User.findByIdAndUpdate(targetUser, { $pull: { followers: currentUser._id } }, { new: true })
        ]); 
        break;
      default:
        break;
    }
    res.status(200).json({ currentUser: updatedCurrentUser, targetUser: updatedTargetUser });
  } catch (err) {
    res.json({ done: false });
  }
}

async function favorite(req, res) {
  const { currentUser, artwork, action } = req.body;
  try {
    let updatedCurrentUser;
    switch(action) {
      case 'favorite':
        updatedCurrentUser = await User.findByIdAndUpdate(currentUser, { $addToSet: { favorites: artwork } }, { new: true });
        break;
      case 'unfavorite':
        updatedCurrentUser = await User.findByIdAndUpdate(currentUser, { $pull: { favorites: { id: artwork.id } } }, { new: true }); 
        break;
      default:
        break;
    }
    res.status(200).json(updatedCurrentUser);
  } catch (err) {
    res.json({ done: false });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
  const query = User.findById(id);
  query.populate('follows');
  query.populate('followers');
  const user = await query.exec();
  if (!user) return res.status(400).json({ error: 'No such user' });
  res.status(200).json(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  if (!user) return res.status(400).json({ error: 'No such user' });
  res.status(200).json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such user' });
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) return res.status(400).json({ error: 'No such user' });
  res.status(200).json(user);
}

module.exports = {
  getUsers,
  getRandomUsers,
  follow,
  favorite,
  getUser,
  updateUser,
  deleteUser,
}