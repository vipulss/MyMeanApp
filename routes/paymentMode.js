var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://vipulss:@vipulss.documents.azure.com:10250/?ssl=true/pathDB');

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

