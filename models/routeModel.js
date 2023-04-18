const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");

function dbRoutetoRoute(dbRoute)  {
    let route = new Route();
    route.id = dbRoute.rou_id;
    route.name = dbRoute.rou_name;
    route.usr_id = dbRoute.rou_use_id;
    route.desc = dbRoute.rou_desc;
    return route;
}

function dbRoutestoRoutes(dbr)  {
    return new Route(dbr.rou_id,
        dbr.rou_name,dbr.rou_use_id, dbr.rou_desc);
}

class Route {
    constructor(id, name, usr_id, desc) {
        this.id = id;
        this.name = name;
        this.usr_id = usr_id;
        this.desc = desc;
    }
    export() {
        let rt=new Route();
        rt.id = this.id;
        rt.name = this.name;
        rt.desc = this.desc;
        return rt; 
    }

    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from route where rou_id=$1", [id]);
            let dbRoutes = dbResult.rows;
            let routes = [];
            for (let dbr of dbRoutes) {
                routes.push(dbRoutestoRoutes(dbr));
            }

            return { status: 200, result: routes[0]}  
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async getAllWaitingRoutes() {
        try {
            //status 3 = a espera
            let dbResult = await pool.query("select rou_id ,rou_use_id , rou_name from routestatus , route where rou_id = rs_rou_id and rs_st_id= 3"); 
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

    static async CreateRoute(userid , routename) {
        try {
            let alreadyExists =
                await pool.query("Select * from route where rou_name=$1", [routename]);
            let dbRoute = alreadyExists.rows;
            if (dbRoute.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "That name already exists"
                    }]
                };
            await pool.query(`Insert into route (rou_use_id, rou_name)
                       values ($1,$2)`, [userid, routename]);
            let dbresult = await pool.query("Select * from route where rou_name=$1", [routename]);
            let dbroute = dbresult.rows;
            let routes = [];
            for (let dbr of dbroute) {
                routes.push(dbRoutestoRoutes(dbr));
            }
            // cria o status da rota criada, este por default é 1 ou seja é uma rota pessoal
            await pool.query(`Insert into routestatus (rs_rou_id, rs_st_id)
                       values ($1,$2)`, [routes[0].id, 1]);   // status 1 = rota pessoal         
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