const mongoose = require('mongoose');
const Artwork = mongoose.model('Artwork');

const getArtworks = async (req, res) => {
  const artworks = await Artwork.find({}).sort({createdAt: -1});
  res.status(200).json(artworks);
}

const getArtwork = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such artwork' });
  const artwork = await User.findById(id);
  if (!artwork) return res.status(400).json({ error: 'No such artwork' });
  res.status(200).json(artwork);
}

const updateArtwork = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such artwork' });
  const artwork = await Artwork.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!artwork) return res.status(400).json({ error: 'No such artwork' });
  res.status(200).json(artwork);
}

const deleteArtwork = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such artwork' });
  const artwork = await Artwork.findOneAndDelete({ _id: id });
  if (!artwork) return res.status(400).json({ error: 'No such artwork' });
  res.status(200).json(user);
}

module.exports = {
  getArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork
}