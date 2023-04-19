const mongoose = require('mongoose');
const Artwork = mongoose.model('Artwork');

async function getArtworks(req, res) {
  const artworks = await Artwork.find({}).sort({createdAt: -1});
  res.status(200).json(artworks);
}

async function getArtwork(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such artwork' });
  const artwork = await User.findById(id);
  if (!artwork) return res.status(400).json({ error: 'No such artwork' });
  res.status(200).json(artwork);
}

async function createArtwork(req, res) {
  const artwork = await Artwork.create({ ...req.body });
  if (!artwork) return res.status(400).json({ error: "Couldn't create artwork" });
  res.status(200).json(artwork);
}

async function updateArtwork(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such artwork' });
  const artwork = await Artwork.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!artwork) return res.status(400).json({ error: 'No such artwork' });
  res.status(200).json(artwork);
}

async function deleteArtwork(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such artwork' });
  const artwork = await Artwork.findOneAndDelete({ _id: id });
  if (!artwork) return res.status(400).json({ error: 'No such artwork' });
  res.status(200).json(user);
}

module.exports = {
  getArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork
}