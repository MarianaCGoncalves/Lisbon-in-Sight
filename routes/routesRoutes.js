const express = require('express');
const router = express.Router();
const Route = require("../models/routeModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


// Get routes of the authenticated user
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
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

router.get('/search_by/name/:name/:personal_search', async function (req, res, next) {
    try {
        console.log("Get routes that contain a certains word in their name");
        let result = await Route.getByName(req.params.name, req.user.id, req.params.personal_search);
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