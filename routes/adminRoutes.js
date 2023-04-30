const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
const Route = require("../models/adminModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


router.get('/general', async function (req, res, next) {
    try{
        console.log("Get Waiting aproval routes");
        let result = await Route.getAllWaitingRoutes();
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});



module.exports = router;