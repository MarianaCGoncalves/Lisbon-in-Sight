const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

class RouteStatus {
    constructor(id, rou_id, status_id) {
        this.id = id;
        this.rou_id = rou_id;
        this.status_id = status_id;
    }
    

    static async RequestAproval(userid , routeid) {
        try {
            let dbstatusresult = 
                await pool.query("select * from routestatus where rou_use_id =$1 and rou_id =$2", [userid,routeid]);
            let dbroutestatus =dbstatusresult.rows;
            if (!dbroutestatus.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "Unable to suggest this route for approvation"
                    }]
                };
            let dbr = dbroutestatus[0];
            await pool.query(`update routestatus set rs_st_id = 3 where rs_id= $1`, [dbr.rs_id]);   
            return { status: 200, result: {msg:"Resquest sucessfuly sent"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    
}

module.exports = RouteStatus;