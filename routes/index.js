var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
var pictureModel = require('../models/picture');
const fs = require('fs')
cloudinary.config({cloud_name: 'dzxqe11sl', api_key: '735133256821756', api_secret: 'vu5dx-YWgZAs8YgaDFDCRPzwrAc'});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST upload */
router.post('/upload', function(req,res,next) {
    //console.log(req.files.snapshot);
      
    var randomName = Math.floor(Math.random() * 1000000)
    var photoPath = `public/images/picture-${randomName}.jpg`;
    var filename = req.files.snapshot;
        //console.log(filename);
   
   //Recording of the file in the backend
    filename.mv(photoPath, function(err) {
       if (err){ 
        res.json( {result: false, message:err} ) ;
       } else {
        res.json( {result: true, message:'file uploaded !'} );
       }

    //uploading of the file int cloudinary  
    cloudinary.v2.uploader.upload(photoPath, 
      function(error, result) {
      console.log('ceci est le cloudinary',result, error);
      
    const newPicture = new pictureModel({
        pictureName: result.url,
        pictureUrl: result.secure_url,
    });
    
    //Recording of the picture in the dbb
    newPicture.save();

    //file remoded from folder public/images
    try {
    fs.unlinkSync(photoPath)
    //file removed
    } catch(err) {
    console.error(err)
    }
      })
  });
    
});

module.exports = router;
