var routename;
var routeid;
var route_desc;

window.onload = async function () {
    try {
      
       routename = sessionStorage.getItem("user_route_name");
         routeid = sessionStorage.getItem("user_route_id");
         route_desc = sessionStorage.getItem("user_route_desc");
          document.getElementById("name").textContent = routename;
          document.getElementById("description").textContent = route_desc;       
          let locals = await requestRouteLocals(routeid);
          initMap(locals);
          points = locals;
          calcRoute(map);
    
        let result = await checkAuthenticated(true);
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
    
    let waypts= [];
    for (let i = 1; i < points.locals.features.length-1; i++) {
      let lan = points.locals.features[i].geometry.coordinates[1];
      let long =points.locals.features[i].geometry.coordinates[0];
      let coordinats= "";
      coordinats= lan + ', ' + long;
      waypts.push({
        location: coordinats,
        stopover: true,
      });
    }
    console.log(waypts);
    let last =points.locals.features.length -1;
    var start = new google.maps.LatLng(points.locals.features[0].geometry.coordinates[1],
      points.locals.features[0].geometry.coordinates[0]);
    var end = new google.maps.LatLng(points.locals.features[last].geometry.coordinates[1],
      points.locals.features[last].geometry.coordinates[0]);
      
        
        
    var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
        optimizeWaypoints: true,
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

  async function askApproval() {
    try {
      debugger;
      window.user = user;
      let msgDOM = document.getElementById("idmsg");
      msgDOM.textContent = "";
 
          let res = await requestApproval( routeid);
  
          if (res.successful) {
              msgDOM.textContent = "Please wait while your route is under review";
          } else {
              msgDOM.textContent = "Sorry we were unable to request your route for approval";
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
  
    