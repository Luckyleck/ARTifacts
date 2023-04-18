const express = require("express");
const router = express.Router();

const { getArtworks, getArtwork, deleteArtwork } = require('../../controllers/artworksController')

router.get('/', getArtworks);

router
  .route('/:id')
  .get(getArtwork)
  .delete(deleteArtwork)
;

module.exports = router;