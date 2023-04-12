async function createRoute() {
  try {
    let result = await checkAuthenticated(true);
    if (result.err) {  throw result.err; }
    window.user = user;
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
        let name = document.getElementById("name").value;
        let res = await requestCreate(name);
        if (res.successful) {
            msgDOM.textContent = "Account created. Go to login page";
        } else {
            msgDOM.textContent = "Was not able to register";
        }  
 } catch (err) {
    console.log(err);
   // alert("Something went wrong!")
}
}





async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/index.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}




function myFunction() {
  
    let x = document.getElementById("myDropdown");
    console.log(x.style.display);
    if(x.style.display === "none" || x.style.display === ""){
      x.style.display ="block";
    }else{
      x.style.display ="none";
    }

  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }