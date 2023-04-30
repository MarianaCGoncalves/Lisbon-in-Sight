const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
const Local = require("../models/localModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;

router.get('/search', async function(res, req, next){

    try{
        let result = await Local.getByName(req.query.name);
        console.log("Get locals by name");
        if(result.status != 200 )
            res.status(result.status).send(result.result);
        else{
            res.status(404).send({msg:"No local with name: "})
        }
        }catch(err){
            console.log(err);
            res.status(500).send(err);
    }
});