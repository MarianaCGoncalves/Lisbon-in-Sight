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

    static async getByName(name){
        try{
            let dbResult = await pool.query("select * from local where loc_name LIKE $1", ["%"+name+"%"]);
            let dbResults = dbResult.rows;

            let locals = [];

            for(let loc of dbResults){
                locals.push(dbLocaltoLocal(loc));
            }
            return {status:200, result: locals}

        }catch(err){
            console.log(err)
            return {status:500, result:err};
        }
    }
}

module.exports = Local;