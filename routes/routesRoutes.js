const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Route = require("../models/routeModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


router.get('/id/:id', async function (req, res, next) {
    try{
        console.log("Get route with id "+ req.params.id);
        let result = await Route.getById(req.params.id);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});

//create route
router.post('/auth',auth.verifyAuth, async function (req, res, next) {
    try {

        if(!req.body.routename || !req.body.routedesc || !req.body.locations.length ){
            res.status(400).send({msg:"please"});
        }
        console.log("Create user route");
        let result = await Route.CreateRoute(req.user.id, req.body.routename, req.body.routedesc, req.body.locations);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//add local route
router.post('/auth/:r_id/local/:l_id',auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Add local to route");
        let result = await Route.addLocaltoRoute(req.params.r_id, req.params.l_id);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get routes of the authenticated user
router.get('/user/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get routes of the authenticated user");
        let result = await Route.getUserRoutes(req.user.id);
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            let routes = result.result.map((rt)=> rt.export());
            res.status(200).send(routes);
            console.log(routes);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get approved routes 
router.get('/general',  async function (req, res, next) {
    try {
        console.log("Get community routes");
        let result = await Route.getGeneralRoutes();
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            let routes = result.result.map((rt)=> rt.export());
            res.status(200).send(routes);
            console.log(routes);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//search routes by name (general)
router.get('/general/search/:name/:general_search', async function (req, res, next) {
    try {
        console.log("Get routes that contain a certains word in their name");
        let result = await Route.getByName(req.params.name, null, req.params.general_search);
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

//search routes by name (user's) 
router.get('/user/search/:name/:personal_search',auth.verifyAuth, async function (req, res, next) {
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

//submit route for community approval
router.get('/request/:id',auth.verifyAuth, async function (req, res, next) {
    try{
        console.log("requesting route "+ req.params.id + "for community approval");
        let result = await Route.AskForAproval(req.user.id ,req.params.id);
        console.log(result);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});



module.exports = router;