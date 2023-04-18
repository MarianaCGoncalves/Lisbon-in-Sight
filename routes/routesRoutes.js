const express = require('express');
var bodyParser = require('body-parser')
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

router.post('/auth',auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Create user route");
        let route = new Route();
        route.usr_id = req.user.id;
        route.name = req.body.routename;
        let result = await Route.CreateRoute(req.user.id, req.body.routename);
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

// Get routes of the authenticated user
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