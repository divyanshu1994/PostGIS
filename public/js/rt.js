$(document).ready(function()
{
var socket=io("http://localhost:3000");
var lat=28.6;
var long=77;
var name=$("#name").html();


 setInterval(function(){ 
     lat+=0.02;
     long+=0.02;
     var lat_long=long+" "+lat;
     console.log("Emmiting "+lat_long+" for "+name);
     socket.emit('change',{name:name,lat_long:lat_long});
  },1000);



socket.emit('server',"How are u server?");

socket.emit('route',"How are u route");

socket.on('client',function(data)
{
    console.log(data);
});


setInterval(function()
{
    console.log("Updating "+name);


    socket.emit('update_map',name);
},1000);

setInterval(function()
{
    console.log("Updating "+name);

    socket.emit('update_intersection',name);
},1000);


  
socket.on('updated',function(data)
{
    console.log("back from pgservice : "+data.lat+" "+data.long);
    $("#lat").html(lat);
    $("#lng").html(long);

    moveMarker(lat,long);
});

socket.on('onchanged',function(data)
{
    console.log("Data updated in server : "+data);
});

socket.on('district',function(data)
{
    console.log("district : "+data);
    $("#district").html(data);
});

});