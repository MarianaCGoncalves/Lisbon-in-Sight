async function requestCreate(name, description, locations) {
    try {
        const response = await fetch(`/api/routes/auth`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              routename: name,
              routedesc: description,
              locations: locations,
          })
        });
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        // We only need to send if the user registered or not 
        return { successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestRouteById(id) {
    try {
        const response = await fetch(`/api/routes/id/${id}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}



async function requestUserRoutes() {
    try {
        const response = await fetch(`/api/routes/user/auth`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestGeneralRoutes() {
    try {
        const response = await fetch(`/api/routes/general`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestGeneralSearch(name, general_search) {
    try {
        const response = await fetch(`/api/routes/general/search/${name}/${general_search}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestPersonalSearch(name, personal_search) {
    try {
        const response = await fetch(`/api/routes/user/search/${name}/${personal_search}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}



// set status to a espera
async function requestApproval(id) {
    try {
        const response = await fetch(`/api/routes/request/${id}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestAddLocalToRoute(r_id, l_id) {
    try {
        const response = await fetch(`/api/routes/${r_id}/auth/local/${l_id}`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
            r_id: r_id,
            l_id:l_id, 
            
          })
        });
        
        return { successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestAllLocalsRoute(id) {
    try {
        const response = await fetch(`/api/routes/${id}/locals`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 routes: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}