async function requestWaitingRoutes() {
    try {
        const response = await fetch(`/api/admin/general`);
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

async function requestDeliberateApproval(routeid, request_approval) {
    try {
        const response = await fetch(`/search_by/name/${routeid}/${request_approval}`);
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