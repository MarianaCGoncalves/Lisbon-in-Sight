const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
const Route = require("../models/adminModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;



router.patch('/awaiting/:id',auth.verifyAuth, async function (req, res, next) {
    try{
        console.log("requesting route "+ req.params.id + "for community approval");
        let result = await Route.RequestAproval(req.user.id ,req.params.id);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});


router.get('/routes', async function (req, res, next) {
    try{
        console.log("Get Waiting aproval routes");
        let result = await Route.getAllWaitingRoutes();
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});



//search routes by name (general or the user's)
router.get('/search_by/name/:name/:personal_search',auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Get routes that contain a certains word in their name");
        let result = await Route.getByName(req.params.name, req.user.id, req.params.personal_search);
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

;

module.exports = router;