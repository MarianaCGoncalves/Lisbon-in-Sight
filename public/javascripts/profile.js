window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        //document.getElementById('user').textContent = "Hello "+window.user.name;
        let routeRes = await requestUserRoutes();
        if (!routeRes.successful) throw { msg: "Something went wrong" };
        populateRoutes(routeRes.routes);
     } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}



function populateRoutes(routes) {
  
  let container = document.getElementById("routecard");
  for (let route of routes) {
    console.log(route);
      let li = document.createElement("li");
      li.setAttribute("class","routecontainer");

      let sec = document.createElement("section");
      sec.setAttribute("class", "routehalves routeleft");
      li.appendChild(sec);

      sec = document.createElement("section");
      sec.setAttribute("class", "routehalves routeright");

      let h3 = document.createElement("h3");
      h3.setAttribute("class", "title");
      h3.textContent = route.name;
      sec.appendChild(h3);
      

      let h4 = document.createElement("h4");
      h4.setAttribute("class", "title");
      h4.textContent = route.desc;
      sec.appendChild(h4);

      li.appendChild(sec);
      
      li.onclick = () => { 
        console.log(route.id);
      };
      container.appendChild(li);
      
  }
}
/*    
    <li>
        <section class="routeleft">
            
        </section>
        <section class="routeright">
            <h3 class="title">Check out our curated routes</h3>
            <h4 class="title">Check out our curated routes</h4>
        </section>
    </li>
    
    <li>
        <section class="routeleft">
            
        </section>
        <section class="routeright">
            <h3 class="title">Check out our curated routes</h3>
            <h4 class="title">Check out our curated routes</h4>
        </section>
    </li>
    
    <li>
        <section class="routeleft">
            
        </section>
        <section class="routeright">
            <h3 class="title">Check out our curated routes</h3>
            <h4 class="title">Check out our curated routes</h4>
        </section>
    </li>

   */

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


async function searchRoute() {
  try {
      
      window.user = user;
       let msgDOM = document.getElementById("msg");
       msgDOM.textContent = "";
      let name = document.getElementById("name").value;
      let result = await requestPersonalSearch( name, true);
      console.log(result.routes);
      if (result.successful) {
        msgDOM.textContent = "";
    } else {
      msgDOM.textContent = "failure";
    } 
      let container = document.getElementById("routecard");
      container.innerHTML = "";
      populateRoutes(result.routes);
      
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