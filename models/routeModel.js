const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");

function dbRoutetoRoute(dbRoute)  {
    let route = new Route();
    route.id = dbRoute.rou_id;
    route.name = dbRoute.rou_name;
    route.usr_id = dbRoute.rou_use_id;
    return route;
}

function dbRoutestoRoutes(dbr)  {
    return new Route(dbr.rou_id,
        dbr.rou_name,dbr.rou_use_id);
}

class Route {
    constructor(id, name, usr_id) {
        this.id = id;
        this.name = name;
        this.usr_id = usr_id;
    }
    export() {
        let rt=new Route();
        rt.id = this.id;
        rt.name = this.name;
        return rt; 
    }

    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from route where rou_id=$1", [id]);
            let dbRoutes = dbResult.rows;
            if (!dbRoutes.length) 
                return { status: 404, result:{msg: "No route found for that id."} } ;
            let dbRoute = dbRoutes[0];
            return { status: 200, result: 
                new Route(dbRoute.id,dbRoute.name, dbRoute.usr_id)} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async getUserRoutes(usr_id) {
        try {
            let dbResult = await pool.query("Select * from route where rou_use_id = $1", [usr_id]);
            let dbRoutes = dbResult.rows;
            let routes = [];
            for (let dbr of dbRoutes) {
                routes.push(dbRoutestoRoutes(dbr));
            }
            return { status: 200, result: routes}  
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    static async CreateRoute(route) {
        try {
           /* let dbResult =
                await pool.query("Select * from appuser where usr_name=$1", [user.name]);
            let dbUsers = dbResult.rows;
            if (dbUsers.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "That name already exists"
                    }]
                };
                */
            dbResult = await pool.query(`Insert into route (rou_use_id, rou_name)
                       values ($1,$2)`, [route.usr_id, route.name]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

        // gets community routes
    static async getGeneralRoutes() {
        try {
            let dbResult = await pool.query("select rou_id ,rou_use_id , rou_name from routestatus , route where rou_id = rs_rou_id and rs_st_id= 2 ");
            let dbRoutes = dbResult.rows;
            let routes = [];
            for (let dbr of dbRoutes) {
                routes.push(dbRoutestoRoutes(dbr));
            }
            return { status: 200, result: routes}  
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "OH NO THE HUMANITY"}};
        }
    }

    static async getByName(name, usr_id, personal_search) {
        try {
            let dbResult;
            if(personal_search == 'false'){
                dbResult = await pool.query("select rou_id ,rou_use_id , rou_name from routestatus , route where rou_id = rs_rou_id and rs_st_id= 2 and rou_name ILIKE $1 ", ["%"+name+"%"]);
            }
            else{
                dbResult = await pool.query("Select * from route where rou_name ILIKE $1 and rou_use_id = $2",
                ["%"+name+"%", usr_id]);
            }
            
            let dbRoutes = dbResult.rows;
            let routes = [];
            for (let dbr of dbRoutes) {
                routes.push(dbRoutestoRoutes(dbr));
            }
            return { status: 200, result: routes}          
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }


}

module.exports = Route;