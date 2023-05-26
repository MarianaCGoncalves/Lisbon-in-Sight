let types = ["Museum", "Garden", "Theater", "Monument", "Church", "Art Galery", "Cultural Landmark", "Library"];
      let quant = 0;
      let lil= [];
      let locations=[];
      let allPoints=[];


window.onload = async function () {
  try {
    let types = await requestAllTypes();
    populatetypes(types.types);
    

      createSelect();
      let result = await checkAuthenticated(true);
      let locals = await requestAllLocal();
      let templocals = await requestAllLocal();
      allPoints= locals;
      locations = JSON.parse(JSON.stringify(locals));
      locations.locals.features= [];
      initMap(allPoints);
      if (result.err) {  throw result.err; }
   } catch (err) {
      console.log(err); 
     // alert("Something went wrong!")
  }
}


let map;
let directionsDisplay;
var directionsService;
var eve;
async function initMap(result) {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.73074327445395, lng: -9.148878289348835},
    zoom: 13,
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
  eve = event.feature.h;

  infowindow.setContent("<div style='width:150px; text-align: center;'>"+name+" <br> "+desc+" <br>  <button onclick='clickme(eve)'> + </button> </div>");
  infowindow.setPosition(event.feature.getGeometry().get());
  infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
  infowindow.open(map);
  });
  

  directionsDisplay.setMap(map);

  google.maps.event.addDomListener(window, "load", initMap);
}
window.initMap = initMap;

function clickme(eve){

  console.log(eve);
  for (let i = 0; i < allPoints.locals.features.length; i++){
    if(allPoints.locals.features[i].properties.id == eve.id){
      locations.locals.features.push(allPoints.locals.features[i]);
      allPoints.locals.features.splice(i,1);
      initMap(allPoints);
      calcRoute(locations);
      populatelocations(locations);
      return; 
    } 
  }
   

}
function calcRoute(locations) {

 

  let waypts= [];
  for (let i = 1; i < locations.locals.features.length-1; i++) {
    let lan = locations.locals.features[i].geometry.coordinates[1];
    let long =locations.locals.features[i].geometry.coordinates[0];
    let coordinats= "";
    coordinats= lan + ', ' + long;
    waypts.push({
      location: coordinats,
      stopover: true,
    });
  }
  console.log(waypts);
  let last =locations.locals.features.length-1;
  if(locations.locals.features.length ==0 ){
    last =0
  }

  var start = new google.maps.LatLng(locations.locals.features[0].geometry.coordinates[1],
    locations.locals.features[0].geometry.coordinates[0]);
  var end = new google.maps.LatLng(locations.locals.features[last].geometry.coordinates[1],
    locations.locals.features[last].geometry.coordinates[0]);
    
      
      
  var request = {
    origin: start,
    destination: end,
    waypoints: waypts,
      optimizeWaypoints: true,
    travelMode: 'WALKING'
  };
 
  directionsService.route(request, function(result, status) {
    console.log(result);
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


async function criar() {
    let values = [];
  
    for (let i =1; i< quant; i++) {
        values.push(document.getElementById("type"+i).value);
    }    
    let result = await requestAutoroute(JSON.stringify(values));
    
    for(i=0; i< result.locals.features.length; i++){
      locations.locals.features.push(result.locals.features[i]);
      for (let l = 0; l < allPoints.locals.features.length; l++){
        if(allPoints.locals.features[l].properties.id == locations.locals.features[i].properties.id){
          allPoints.locals.features.splice(l,1);
        }
      }           
    } 
    initMap(allPoints);
    calcRoute(locations);
    populatelocations(locations);
  }

async function createRoute() {
  try {
  
    window.user = user;
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let res = await requestCreate(name, description, locations);

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



async function searchLocal(){
  try{
      let search = document.getElementById("search");
      if(search.value){
      let result = await requestLocalByName(search.value);
      initMap(result);
      }else{
        initMap(allPoints);
      }
      
      calcRoute(locations);
      
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
          if(click == "false"){
            lil.push(type.id);
            console.log(type);
            click= true;
            console.log(lil);
            result = await requestLocalByType(lil);
            console.log(result);
            initMap(result);
          }
          else{
        
            let index= lil.indexOf(type.id);
            console.log(index);
            if (index> -1){
            lil.splice(index,1);
            if(lil.length== 0){
              lil.push("a");
              result = await requestLocalByType(lil);
              lil.splice('a',1);
              initMap(result);
              return;
            }
            result = await requestLocalByType(lil);
            console.log(result);
            initMap(result);
            }
            console.log(lil);
            click= "false";
          }
          
        };
  
        sec.appendChild(checkbox);
  
        let h3 = document.createElement("h3");
        h3.setAttribute("class", "typetext");
        h3.textContent = type.name;
        sec.appendChild(h3); 
        
        li.appendChild(sec);   
        
        
  
        container.appendChild(li);
        
    }
  }
  

  function populatelocations(locations) {
    
    let container = document.getElementById("locationscard");

    if(locations.locals.features.length == 0)
    {
      container.innerHTML="";
    }

    while(container.firstChild){
      container.removeChild(container.firstChild);
    }
    for (let location of locations.locals.features) {      
        let li = document.createElement("li");
        li.setAttribute("class","locationcontainer");
        let sec = document.createElement("section");
        sec.setAttribute("class","locationsection");

        let h3 = document.createElement("h3");
        h3.setAttribute("class", "title");
        h3.textContent = location.properties.name;        ;
        sec.appendChild(h3); 

        let checkbox = document.createElement("button");
        checkbox.setAttribute("type", "sybmit");    
        checkbox.setAttribute("class","locationremove");
        checkbox.textContent= "-"
       checkbox.onclick = () => { 
       
            let index= locations.locals.features.indexOf(location);
            if (index> -1){
              allPoints.locals.features.push(location);
              locations.locals.features.splice(index,1);
              console.log(locations.locals.features);
              initMap(allPoints);
              populatelocations(locations);
              calcRoute(locations);     
            }
      }
        sec.appendChild(checkbox);
        li.appendChild(sec);    
        container.appendChild(li);
        
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
