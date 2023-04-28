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
            msgDOM.style.display='block';
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong username or password";  
            msgDOM.style.display='block';  
        } else {
            msgDOM.textContent = "Login successful!";  
            msgDOM.style.display='block';  
            window.location.pathname = "/home.html"
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}