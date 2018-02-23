var express = require("express");
var router = express.Router();



router.get('/',function(req,res){

    res.send("ALL BASIC UI PAGES AND ROUTES ARE DEFINED HERE"); 
       
})    


module.exports = router;
