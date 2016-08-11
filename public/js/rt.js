$(document).ready(function()
{
var socket=io("http://localhost:3000");
var lat;
var long;
var name=$("#name").html();
socket.emit('update_map',name);



 setInterval(function(){ 
     var sign=Math.random()<0.5?1:-1;
     lat+=Math.random()/100*sign;
     long+=Math.random()/100*sign;
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
    socket.emit('update_nearby',name);
},500);




  
socket.on('updated',function(data)
{
    if(data.name==name){
    console.log("back from pgservice : "+data.lat+" "+data.long);
    lat=data.lat;
    long=data.long;
    $("#lat").html(lat);
    $("#lng").html(long);

    moveMarker(lat,long);

    }
});

socket.on('onchanged',function(data)
{
    console.log("Data updated in server : "+data);
});

socket.on('district',function(data)
{
    if(data.name==name)
    {
    console.log("district : "+data);
    $("#district").html(data.district);
    }
});

socket.on('nearby',function(data)
{
     $("#nearby_table").html("");
    if(data.name==name)
    {

    var html="";

    for(var i=0;i<data.outputs.length;i++) { 
     $("#nearby_table").append("<th>"+data.outputs[i]+"</th>");
    
    }
    
    for(var i=0;i<data.nearbys.length;i++ ) {

     $("#nearby_table").append("<tr>");
    for(var j=0;j<data.outputs.length;j++ ) 
    { 
         $("#nearby_table").append("<td>"+ data.nearbys[i][data.outputs[j]] +"</td>");
    }
     $("#nearby_table").append("</tr>");
    }

    }

    console.log("asdasdasdasdasd" +html);
 


});


});