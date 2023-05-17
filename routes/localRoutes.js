const express = require('express');
const router = express.Router();
const Local = require("../models/localModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");

router.get('/search/:name', async function(req, res, next){

    try{
        let result = await Local.getbyNameSearchBar(req.params.name);
        console.log("Get locals by name");
        if(result.status != 200 )
            res.status(result.status).send(result.result);
        else{
            res.status(result.status).send(result.result);
        }
        }catch(err){
            console.log(err);
                res.status(500).send(err);
    }
});

router.get('/', async function(req, res, next){
    try{
        let result = await Local.getAll();
        console.log("Get all locals");

        if(result.status != 200)
            res.status(result.status).send(result.result);
        else{
            res.status(result.status).send(result.result);
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/auto/:loctypeIds', async function(req, res, next){
    try{

        let result = await Local.getAutoRoute(req.params.loctypeIds);
        console.log("auto route");

        if(result.status != 200)
            res.status(result.status).send(result.result);
        else{
            res.status(result.status).send(result.result);
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/type/:type', async function(req, res, next){
    try{
        let result = await Local.getByType(req.params.type);
        console.log("Get locals by type");

        if(result.status !=200)
            res.status(result.status).send(result.result);
        else{
            res.status(result.status).send(result.result);
        }
    }catch(err){
        console.log(err);
            res.status(500).send(err);
    }
});

module.exports = router;