async function requestUserRoutes() {
    try {
        const response = await fetch(`/api/routes/auth`);
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


async function requestRouteByName(name, personal_search) {
    try {
        const response = await fetch(`/api/routes/search_by/name/${name}/${personal_search}`);
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


