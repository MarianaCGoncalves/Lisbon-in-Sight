const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");

function dbLocaltoLocal(dbLocal){
    let local = new Local();
    local.id= dbLocal.loc_id;
    local.name = dbLocal.loc_name;
    local.desc= dbLocal.loc_desc;
    local.coordinates = dbLocal.loc_coordinates;
    return local;
}

class Local {
    constructor(id, name, desc, coordinates){
        this.id= id;
        this.name= name;
        this.desc = desc;
        this.coordinates= coordinates;
    }

    export(){
        let local = new Local();
        local.name = this.name;
        local.desc = this.desc;
        local.coordinates= this.coordinates;
        return local;
    }

    static async getbyNameSearchBar(name){
        try{
            let dbResult = await pool.query("select loc_name from local where loc_name LIKE $1", [name]);
            let dbResults = dbResult.rows;
            let locals = [];
            for(let loc of dbResults){
                locals.push(dbLocaltoLocal(loc));
            }
            return{status:200, result:locals}
        }catch(err){
            console.log(err);
            return{status:500, result:err};
        }
    }
    static async getByName(name){
        try{
            let dbResult = await pool.query("select loc_name, loc_desc, st_asGeojson(loc_coordinates), type_name from local, localtype, type where loc_type=loc_l_id and loc_t_id=type_id and loc_name LIKE $1", ["%"+name+"%"]);
            let dbResults = dbResult.rows;

            if(!dbResults.length){
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "Unable to get locals by name"
                    }]
                };
            }
            
            let geojson = {
                "type": "FeatureCollection",
                "features": [
                ]
            }
            let geojson_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {}
            }
            for(let point of dbResults){
                geojson_feature = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {}
                }

                geojson_feature.geometry = JSON.parse(point.st_asgeojson);
                geojson_feature.properties.name = point.loc_name;
                geojson_feature.properties.desc = point.loc_desc;
                geojson_feature.properties.type = point.type_name;
                geojson.features.push(geojson_feature);
            }

            let locals = geojson;
            return {status:200, result:locals}
            

        }catch(err){
            console.log(err)
            return {status:500, result:err};
        }
    }

    static async getAll(){
        try{
            let dbResult = await pool.query("select loc_name, loc_desc, ST_asGeojson(loc_coordinates), type_name from local, localtype, type where loc_type=loc_l_id and loc_t_id=type_id");
            let dbResults = dbResult.rows;
            
            
            if(!dbResults.length){
                return {
                    status: 400, result: [{
                        location: "body",
                        msg: "Unable to get locals"
                    }]
                };
            }
            let geojson = {
                "type": "FeatureCollection",
                "features": [
                ]
            }
            let geojson_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {}
            }
            for(let point of dbResults){
                geojson_feature = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {}
                }

                geojson_feature.geometry = JSON.parse(point.st_asgeojson);
                geojson_feature.properties.name = point.loc_name;
                geojson_feature.properties.desc = point.loc_desc;
                geojson_feature.properties.type = point.type_name;
                geojson.features.push(geojson_feature);
            }

        
            let locals = geojson;
            return {status:200, result:locals}
            
        }catch(err){
            console.log(err);
            return{status:500, result:err};
        }
    }

    static async getByType(locTypeIds){
        try{
            let sql;
            let dbResult;
            if (locTypeIds.length == 0) {
                sql = "select loc_name, loc_desc, st_asGeojson(loc_coordinates) from local";
                dbResult = await pool.query(sql);
            } else {
                sql = `Select * from local where loc_type = $1`;
                for(let i=1; i < locTypeIds.length; i++) {
                    sql += " or loc_type = $"+(i+1);
                }
                dbResult = await pool.query(sql,locTypeIds);
            }
            let dbResults = dbResult.rows;
            if(!dbResults.length){
                return {
                    status: 400, result: [{
                        location: "body", param: "type",
                        msg: "Unable to get locals by type"
                    }]
                };
            }
            
            let geojson = {
                "type": "FeatureCollection",
                "features": [
                ]
            }
            let geojson_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {}
            }
            for(let point of dbResults){
                geojson_feature = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {}
                }

                geojson_feature.geometry = JSON.parse(point.st_asgeojson);
                geojson_feature.properties.name = point.loc_name;
                geojson_feature.properties.desc = point.loc_desc;
                geojson_feature.properties.type = point.type_name;
                geojson.features.push(geojson_feature);
            }

        
            let locals = geojson;
            return{status:200, result:locals}
            
        }catch(err){
            console.log(err);
            return{status:500, result:err}
        }
    }

    static async getAutoRoute(locTypeIds){
        try{
            let sql;
            let dbResult;
            let route = [];
            
            for(let i=0; i < locTypeIds.length; i++) {
                sql = "Select * from local where loc_type = $"+(i);
                dbResult = await pool.query(sql,locTypeIds);
                let dbResults = dbResult.rows;
                if(!dbResults.length){
                return {
                    status: 400, result: [{
                        location: "body", param: "type",
                        msg: "Unable to get locals by type"
                    }]
                };
                }
                /*
                let locals = [];
                for(let loc of dbResults){
                locals.push(dbLocaltoLocal(loc));
                }
                let int = (Math.random() * locals.length);
                route.push(locals[int]);
                */
                let int = (Math.random() * dbResults.length);
                route.push(dbLocaltoLocal(dbResults[int]));
            }
            
            
            
            let geojson = {
                "type": "FeatureCollection",
                "features": [
                ]
            }
            let geojson_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {}
            }
            for(let point of route){
                geojson_feature = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {}
                }

                geojson_feature.geometry = JSON.parse(point.st_asgeojson);
                geojson_feature.properties.name = point.loc_name;
                geojson_feature.properties.desc = point.loc_desc;
                geojson_feature.properties.type = point.type_name;
                geojson.features.push(geojson_feature);
            }

        
            let locals = geojson;
            return{status:200, result:locals}
            
        }catch(err){
            console.log(err);
            return{status:500, result:err}
        }
    }

    static async getAllWithinRadius(){
        try{
            let dbResult = await pool.query("select loc_name, loc_desc, ST_asGeojson(loc_coordinates), type_name from local, localtype, type where loc_type=loc_l_id and loc_t_id=type_id");
            let dbResults = dbResult.rows;
            
            
            if(!dbResults.length){
                return {
                    status: 400, result: [{
                        location: "body",
                        msg: "Unable to get locals"
                    }]
                };
            }
            let geojson = {
                "type": "FeatureCollection",
                "features": [
                ]
            }
            let geojson_feature = {
                "type": "Feature",
                "properties": {},
                "geometry": {}
            }
            for(let point of dbResults){
                geojson_feature = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {}
                }

                geojson_feature.geometry = JSON.parse(point.st_asgeojson);
                geojson_feature.properties.name = point.loc_name;
                geojson_feature.properties.desc = point.loc_desc;
                geojson_feature.properties.type = point.type_name;
                geojson.features.push(geojson_feature);
            }

        
            let locals = geojson;
            return {status:200, result:locals}
            
        }catch(err){
            console.log(err);
            return{status:500, result:err};
        }
    }
}
module.exports = Local;