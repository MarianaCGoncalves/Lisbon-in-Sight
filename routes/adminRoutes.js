const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
const Route = require("../models/adminModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


router.get('/general',auth.verifyAdmin, async function (req, res, next) {
    try{
        console.log("Get Waiting aproval routes");
        let result = await Route.getAllWaitingRoutes();
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});

//Decline or approve routes for community standing
router.get('/request_by/name/:routeid/:request_granted',auth.verifyAdmin, async function (req, res, next) {
    try {
        console.log("Reject or aprove a route_status request");
        let result = await Route.DeliberateApproval(req.params.routeid, req.params.request_granted);
        console.log("Get routes thrtains word in their name");
        console.log(result.routes);
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            let routes = result.result.map((rt)=> rt.export());
            res.status(200).send(routes);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



module.exports = router;