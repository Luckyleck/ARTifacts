const express = require("express");
const router = express.Router();

const { getArtworks, getArtwork, createArtwork, updateArtwork, deleteArtwork } = require('../../controllers/api/artworksController')

router.get('/', getArtworks);

router
  .route('/:id')
  .get(getArtwork)
  .post(createArtwork)
  .put(updateArtwork)
  .delete(deleteArtwork)
;

module.exports = router;