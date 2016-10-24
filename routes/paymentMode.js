var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:IRUPUEPSCWXOJJRB@sl-us-dal-9-portal.0.dblayer.com:16164/admin?ssl=true');

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

    var paymentdata = {name:"Vipul", description:  new Date().toISOString()};
	
	var paymentmodesdata = new paymentMode(paymentdata);

	paymentmodesdata.save( function(error, data){
    });
	
    paymentMode.find({},function(err,docs){
        res.json(docs);
        res.end();
    });
});

module.exports = router;

