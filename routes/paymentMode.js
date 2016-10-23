var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://vipulss:i1gwiwEWpHs6iBRvLvotFr0jsQ61WVaBjjUJffSq78PcmR0KRi0kP1KXwDGzJLxuCWY2Va0gk5kK7GOqp9V9aw==@vipulss.documents.azure.com:10250/pathDB?ssl=true');

db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function callback(){
        console.log("CONNECTED");
    });

var paymentModeSchema = new mongoose.Schema({ name : String, description : String}, { collection : 'PaymentModes'})
var paymentMode = mongoose.model('paymentmodes',paymentModeSchema);

var router = express.Router();

router.use(function(req,res,next) {

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/getAll', function(req,res,next) {

    
    paymentMode.find({},function(err,docs){
        res.json(docs);
        res.end();
    });
});

module.exports = router;

