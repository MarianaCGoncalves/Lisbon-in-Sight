const express = require('express');
const router = express.Router();
const User = require("../models/usersModel");
const RouteStatus = require("../models/routestatusModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


// Get information about the authenticated user (only the name)
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get authenticated user");
        let result = await User.getById(req.user.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let user = new User();
        // sendig only the name
        user.name = result.result.name;
        res.status(result.status).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('', async function (req, res, next) {
    try {
        console.log("Register user ");
        let user = new User();
        user.name = req.body.username;
        user.pass = req.body.password;
        let result = await User.register(user);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Logout user ");
        // this will delete everything in the cookie
        req.session = null;
        // Put database token to null (req.user token is undefined so saving in db will result in null)
        let result = await User.saveToken(req.user);
        res.status(200).send({ msg: "User logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/auth', async function (req, res, next) {
    try {
        console.log("Login user ");
        let user = new User();
        user.name = req.body.username;
        user.pass = req.body.password;
        let result = await User.checkLogin(user);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        // result has the user with the database id
        user = result.result;
        let token = utils.genToken(tokenSize);
        // save token in cookie session
        req.session.token = token;
        // and save it on the database
        user.token = token;
        result = await User.saveToken(user);
        res.status(200).send({msg: "Successful Login!"});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.patch('/send_request/:id',auth.verifyAuth, async function (req, res, next) {
    try{
        console.log("requesting route "+ req.params.id + "for community approval");
        let result = await RouteStatus.RequestAproval(req.user.id ,req.params.id);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err)
            res.status(500).send(err);
        
    }
});

module.exports = router;