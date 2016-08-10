$(document).ready(function()
{
var socket=io("http://localhost:3000");
var lat;
var long;
var name=$("#name").html();
socket.emit('update_map',name);



 setInterval(function(){ 
     var sign=Math.random()<0.5?1:-1;
     lat+=Math.random()/200*sign;
     long+=Math.random()/200*sign;
     var lat_long=long+" "+lat;
     console.log("Emmiting "+name+"    "+lat_long+" for "+name);
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
    socket.emit('update_intersection',name);
},500);




  
socket.on('updated',function(data)
{
    console.log("back from pgservice : "+data.lat+" "+data.long);
    lat=data.lat;
    long=data.long;
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