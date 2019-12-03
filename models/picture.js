const mongoose = require('mongoose');

var PictureSchema = mongoose.Schema(
  {
    pictureName: String,
    pictureUrl: String
  }
)


const pictureModel = mongoose.model('pictures', PictureSchema);

module.exports = pictureModel;