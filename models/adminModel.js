const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

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
    

    static async getAllWaitingRoutes() {
        try {
            //status 3 = a espera
            let dbResult = await pool.query("select rou_id ,rou_use_id , rou_name, rou_desc from routestatus, route where rou_id = rs_rou_id and rs_st_id= 3"); 
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

    static async DeliberateApproval( routeid, request_granted) {
        try {
            let dbstatusresult = 
                await pool.query("select rs_id from routestatus, route where rou_id =$1 and rou_id = rs_rou_id", [routeid]);
            let dbroutestatus =dbstatusresult.rows;
            if (!dbroutestatus.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "Unable to suggest this route for approvation"
                    }]
                };
            let dbr = dbroutestatus[0];
            console.log(dbr.rs_id)
            if(request_granted == 'false'){
               await pool.query("update routestatus set rs_st_id = 4 where rs_id= $1", [dbr.rs_id]);
               return { status: 200, result: {msg:"Resquest sucessfuly declined"}};
            }
            else{
               await pool.query("update routestatus set rs_st_id = 2 where rs_id= $1", [dbr.rs_id]);   
               return { status: 200, result: {msg:"Resquest sucessfuly accepted"}};
            }
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    

    
}

module.exports = Route;