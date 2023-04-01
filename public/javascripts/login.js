async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    console.log(window.location);
    try {
        let name = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        let result = await requestLogin(name,pass);
        if (result.err) {
            msgDOM.textContent = "An error occurred";
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong username or password";    
        } else {
            msgDOM.textContent = "Login successful!";    
            window.location.pathname = "/home.html"
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}