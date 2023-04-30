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