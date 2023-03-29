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

function dbRoutestoRoutes(dbRoutes)  {
    return new Route(route.rou_id,route.rou_use_id,
        route.rou_name);
}

class Route {
    constructor(id, name, usr_id) {
        this.id = id;
        this.name = name;
        this.usr_id = usr_id;
    }
    export() {
        let route=new Route();
        route.name = this.name;
        return route; 
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
            for (let dbsl of dbRoutes) {
                routes = 
                routes.push(new Route(route.rou_id,route.rou_use_id,
                    route.rou_name));
            }
            return { status: 200, result: routes}  
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    static async getByName(name) {
        try {
            let dbResult = await pool.query("Select * from route where rou_name LIKE $1 ", ["%"+name+"%"]);
            let dbRoutes = dbResult.rows;
            let routes = [];
            for (let dbsl of dbRoutes) {
                routes = 
                routes.push(new Route(route.rou_id,route.rou_use_id,
                    route.rou_name));
            }
            return { status: 200, result: routes}          
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }


}

module.exports = Route;