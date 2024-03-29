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

    static async CreateRoute(userid , routename, description, location) {
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
            await pool.query(`Insert into route (rou_use_id, rou_name, rou_desc)
                       values ($1,$2,$3)`, [userid, routename, description]);
            let dbresult = await pool.query("Select * from route where rou_name=$1", [routename]);
            let dbroute = dbresult.rows;
            let route = [];
            for (let dbr of dbroute) {
                route.push(dbRoutestoRoutes(dbr));
            }
            // cria o status da rota criada, este por default é 1 ou seja é uma rota pessoal
            await pool.query(`Insert into routestatus (rs_rou_id, rs_st_id)
                       values ($1,$2)`, [route[0].id, 1]);   // status 1 = rota pessoal 
            for(let i=0; i < location.locals.features.length; i++) {
                await pool.query("insert into routelocal(rl_rou_id, rl_loc_id) values($1, $2);",[route[0].id, location.locals.features[i].properties.id]);
            }
            
                               
            return { status: 200, result: route} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async addLocaltoRoute(r_id, l_id){
        try{
            let dbResult = await pool.query("insert into routelocal(rl_rou_id, rl_loc_id) values($1, $2);",[r_id, l_id]);
            let dbResults = dbResult.rows;
            let routes = [];
            for(let dbr of dbResults){
                routes.push(dbRoutestoRoutes(dbr));
            }
        }catch(err){
            console.log(err);
            return{status:500, result:err}
        }
    }
        // gets community routes
    static async getGeneralRoutes() {
        try {
            let dbResult = await pool.query("select rou_id ,rou_use_id , rou_name, rou_desc from routestatus , route where rou_id = rs_rou_id and rs_st_id= 2 ");
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

    static async AskForAproval(userid , routeid) {
        try {
            let dbstatusresult = 
                await pool.query("select rs_id from routestatus, route where rou_use_id =$1 and rou_id =$2 and rou_id = rs_rou_id", [userid,routeid]);
            let dbroutestatus =dbstatusresult.rows;
            if (!dbroutestatus.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "Unable to suggest this route for approvation"
                    }]
                };
            let validroute = 
                await pool.query("select rs_id from routestatus, route where rou_id =$1 and rou_id = rs_rou_id and ( rs_st_id = 4 or rs_st_id = 2)", [routeid]);        
            if (validroute.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "Unable to suggest this route for approvation"
                    }]
                };
            let dbr =dbroutestatus[0];
            await pool.query(`update routestatus set rs_st_id = 3 where rs_id= $1`, [dbr.rs_id]);   
            return { status: 200, result: {msg:"Resquest sucessfuly sent"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


}

module.exports = Route;