const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");

function dbTypetoType(dbType){
    let type = new Type();
    type.id= dbType.type_id;
    type.name = dbType.type_name;
    return type;
}

class Type {
    constructor(id, name){
        this.id= id;
        this.name= name;
    }

    export(){
        let type = new Type();
        type.name = this.name;
        return type;
    }

    static async getAll(){
        try {
            let dbResult = await pool.query("select * from type");
            let dbTypes = dbResult.rows;
            let types = [];
            for (let dbt of dbTypes) {
                types.push(dbTypetoType(dbt));
            }
            return { status: 200, result: types}  
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "no no no"}};
        }
    }
}
module.exports = Type;