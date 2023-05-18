let types = ["Museu", "Jardim", "Teatro", "Monumento", "Igreja", "Arte", "Cultura", "Biblioteca"];
      let quant = 0;
      let lil= [];
window.onload = async function () {
  try {
    let types=[1,2,3,4,5,6,7,8];
    populatetypes(types);
      createSelect();
      let locals = await requestAllLocal();
      let result = await checkAuthenticated(true);
      initMap(locals);
      if (result.err) {  throw result.err; }
   } catch (err) {
      console.log(err);
     // alert("Something went wrong!")
  }
}


let map;
let directionsDisplay;
var directionsService;
async function initMap(result) {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.73074327445395, lng: -9.148878289348835},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    heading: 90,
    tilt: 45,
    styles:[{"stylers": [{"visibility":"off"}]}]
  });
 
  try{
    console.log(result);
    map.data.addGeoJson(result.locals);

    
  }
  catch(err){
    console.log(err);
    return;
  }
  map.setTilt(50);

  var infowindow = new google.maps.InfoWindow();
  map.data.addListener('click', function(event) {
  var name = event.feature.getProperty("name");
  var desc = event.feature.getProperty("desc");

  infowindow.setContent("<div style='width:150px; text-align: center;'>"+name+" <br> "+desc+"</div>");
  infowindow.setPosition(event.feature.getGeometry().get());
  infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
  infowindow.open(map);
  });
  

  directionsDisplay.setMap(map);

  google.maps.event.addDomListener(window, "load", initMap);
}
window.initMap = initMap;

function calcRoute(map) {
  console.log(points);
  debugger;
  let last =points.locals.features.length -1;
  var start = new google.maps.LatLng(points.locals.features[0].geometry.coordinates[1],
    points.locals.features[0].geometry.coordinates[0]);
  var end = new google.maps.LatLng(points.locals.features[1].geometry.coordinates[1],
    points.locals.features[1].geometry.coordinates[0]);
    /*
      waypoints: waypts,
      optimizeWaypoints: true,
      */
  var request = {
    origin: start,
    destination: end,
    travelMode: 'WALKING'
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
  }});

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

let points;

async function criar() {
    let values = [];
    for (let i =1; i< quant; i++) {
        values.push(document.getElementById("type"+i).value);
    }    
    let result = await requestAutoroute(JSON.stringify(values));
    initMap(result);
    points = result;
    debugger;
    calcRoute(map);
    

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

  function populatetypes(types) {
  
    let container = document.getElementById("typescard");
    for (let type of types) {
        let click ="false";
      
        let li = document.createElement("li");
        li.setAttribute("class","routecontainer");
        let sec = document.createElement("section");
        sec.setAttribute("class","checkboxcontainer");
  
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
  
        checkbox.onclick = async () => { 
          let result;
          debugger;
          if(click == "false"){
            lil.push(type);
            console.log(type);
            click= true;
            console.log(lil);
            result = await requestLocalByType(lil);
            console.log(result);
            initMap(result);
          }
          else{
            let index= lil.indexOf(type);
            console.log(index);
            if (index> -1){
            lil.splice(index,1);
            if(lil.length== 0){
              lil.push("a");
            }
            result = await requestLocalByType(lil);
            lil.splice('a',1);
            console.log(result);
            initMap(result);
            }
            console.log(lil);
            click= "false";
          }
          
        };
  
        sec.appendChild(checkbox);
  
        let h3 = document.createElement("h3");
        h3.setAttribute("class", "title");
        h3.textContent = type;
        sec.appendChild(h3); 
        
        li.appendChild(sec);   
        
        
  
        container.appendChild(li);
        
    }
  }

  