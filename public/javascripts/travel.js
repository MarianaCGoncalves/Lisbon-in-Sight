let types = ["Museu", "Jardim", "Teatro", "Monumento", "Igreja", "Arte", "Cultura", "Biblioteca"];
      let quant = 0;
window.onload = async function () {
  try {
      createSelect();
      let result = await checkAuthenticated(true);
      if (result.err) {  throw result.err; }
   } catch (err) {
      console.log(err);
     // alert("Something went wrong!")
  }
}

function createSelect () {
    quant++;
    let container = document.getElementById("types");
    let select = document.createElement("select");
    select.id = "type"+quant;
    container.appendChild(select);
    for(let i in types) {
        let option = document.createElement("option");
        option.textContent = types[i];
        option.value = (parseInt(i)+1);
        select.appendChild(option);
    }
    select.value="";
    select.onchange = () => {createSelect();};
} 

async function criar() {
    let values = [];
    for (let i =1; i< quant; i++) {
        values.push(document.getElementById("type"+i).value);
    }    
    alert (values);
}

async function createRoute() {
  try {
    window.user = user;
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let res = await requestCreate(name, description);

        if (res.successful) {
            msgDOM.textContent = "Route Created";
        } else {
            msgDOM.textContent = "Route already exists";
        }  
 } catch (err) {
    console.log(err);
   alert("Something went wrong!")
}
}

let map;

async function initMap() {

  try{
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 38.73074327445395, lng: -9.148878289348835},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      heading: 90,
      tilt: 45
    });
    let result = await requestAllLocal();
    console.log(result);
  
  
  map.setTilt(50);
}
catch(err){
  console.log(err);
  return;
  }
}
window.initMap = initMap;



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



async function searchLocals(){
  try{
      let search = document.getElementById("search_local");
      let result = await requestLocalByName(search);
      console.log(result.locals);

      if(result.successful){
        msgDOM.textContent= "";
      }
      else{
        msgDOM.textContent= "Failed";
      }
}catch(err){

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

  