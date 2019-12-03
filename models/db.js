const mongoose = require('mongoose');

var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
   useUnifiedTopology: true
  };

mongoose.connect('mongodb+srv://florence:Cdvmup@61@cluster0-8emcm.mongodb.net/faceUp?retryWrites=true&w=majority',
    options,
    function(err) {
     if (err) {
       console.log(`error, failed to connect to the database because --> ${err}`);
     } else {
       console.info('*** Locapic database coonection done ***');
     }
    }
);

module.exports = mongoose;