async function requestLocalByName(name){
    try{
        const response = await fetch(`/api/local/search/${name}`);
        var result = await response.json();
        return{ successful: response.status == 200,
            unauthenticated: response.status == 401,
            locals: result
        };
    }catch(err){
        console.log(err);
        return{err:err};
    }
}

async function requestLocalByType(type){
    try {
        const response = await fetch(`/api/local/type/${type}`);
        var result = await response.json();
        return{ successful: response.status == 200,
            unauthenticated: response.status == 401,
            locals: result
        };
    }catch(err){
        console.log(err);
        return{err:err};
    }
}

async function requestAutoroute(loctypeIds){
    try {
        const response = await fetch(`/api/local/auto/${loctypeIds}`);
        var result = await response.json();
        return{ successful: response.status == 200,
            unauthenticated: response.status == 401,
            locals: result
        };
    }catch(err){
        console.log(err);
        return{err:err};
    }
}

async function requestAllLocal(){
    try{
        const response = await fetch(`/api/local/`);
        var result = await response.json();

        return{successful: response.status==200,
        unauthenticated: response.status==401,
        locals:result};
    }catch(err){
        console.log(err);
        return{err:err};
    }
}

async function requestRouteLocals(id){
    try{
        const response = await fetch(`/api/local/${id}/locals`);
        var result = await response.json();

        return{successful: response.status==200,
            unauthenticated: response.status==401,
            locals:result};
        }catch(err){
            console.log(err);
            return{err:err};
        }
    }