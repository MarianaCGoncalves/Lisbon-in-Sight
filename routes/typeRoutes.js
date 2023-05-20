const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Type = require("../models/typeModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");

router.get('/',  async function (req, res, next) {
    try {
        console.log("Get all types of local");
        let result = await Type.getAll();
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            let types = result.result.map((rt)=> rt.export());
            res.status(200).send(types);
            console.log(types);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
