async function requestLocalByName(name){
    try{
        const response = await fetch(`/api/local/${name}`);
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