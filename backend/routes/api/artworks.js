const express = require("express");
const router = express.Router();

const { getArtworks, getArtwork, updateArtwork, deleteArtwork } = require('../../controllers/artworksController')

router.get('/', getArtworks);

router
  .route('/:id')
  .get(getArtwork)
  .put(updateArtwork)
  .delete(deleteArtwork)
;

module.exports = router;