var express=require('express');
var ejs=require('ejs');
var ejs_mate=require('ejs-mate');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var urlencoded=bodyParser.urlencoded({extended:true});
var socket=require('socket.io');
var util=require('util');

var app= express();
var pg_service=require('./real-time/rt_pgservice');
var pgapp=require('./pgapp');

var PgService =new pg_service("postgres","himdib");
var PgApp=new pgapp("postgres","himdib");


app.use(express.static(__dirname+"/public"));
app.engine('ejs',ejs_mate);
app.set('view engine','ejs');
app.use(urlencoded);



var server=app.listen(3000,function()
{
    console.log("Listening to server");
});
var io=require('socket.io')(server);


app.get('/rt/',function(req,res,next){
    res.render('rt_views/main');

    io.emit('client',"HI there");
});

app.get('/rt/add',function(req,res,next)
{
    res.render('rt_views/add');
});


app.post('/rt/add',function(req,res,next)
{
    var name=req.body.name;
    var lat_long=req.body.geometry;

    PgService =new pg_service("postgres","himdib");
    PgService.create(name,lat_long,function(obj)
    {
        if(obj.err)
        {
            return res.json(err);
        }
        console.log(obj.data);
        res.json({
            msg:"Success",
            data:obj.data
        })
        // res.render('rt_views/welcome',{
        //     name:name
        // });
    });

});

app.post('/rt/update',function(req,res,next)
{
    var name=req.body.name;
    var lat_long=req.body.geometry;

    PgService =new pg_service("postgres","himdib");
    PgService.update(name,lat_long,function(obj)
    {
        if(obj.err)
        {
            return res.json(err);
        }
        res.json(obj.data);
    });

});

app.get('/rt/welcome/:user',function(req,res,next)
{

PgApp.api_map("Delhi","SELECT  (ST_AsGeoJSON(geom)) as geomtry from districts",function(obj)
{
    if(obj.err)
    {
        console.log("E "+obj.err);
       return res.render('error',{
            err:obj.err
        })
    }

        var data=obj.data;
     //   data=JSON.parse(data);

   console.log(data);

     res.render('rt_views/welcome',
     {
         map:data,
         user:req.params.user
    });
  
});

});

io.on("route",function(data)
{
    console.log(data);
    io.emit("client","I m doing fine , Mr Clinet")
});


io.sockets.on('connection',function(socket)
{
    app.set('socketio',socket);
    console.log("Connected to socket");
    
    socket.on('server',function(data)
    {
        console.log("Message from client to server "+data);
    });

    socket.emit('client',{
        msg:"Message from server to client"
    });

    socket.on('error', function (err) { 
   console.log("Socket.IO Error"); 
   console.log(err.stack); // this is changed from your code in last comment
});

socket.on('change',function(data)
{
    console.log("Changing ............");

 PgService =new pg_service("postgres","himdib");
    PgService.update(data.name,data.lat_long,function(obj)
    {
        if(obj.err)
        {
            return res.json(err);
        }
        io.emit('onchanged',"Updated");
    });

});

socket.on('update_map',function(name)
{
  //  console.log("In pgservice : updating map");

    PgService.getUser(name,function(obj)
    {
        if(obj.err)
        {
            return res.json(err);
        }
        
        io.emit('updated',{
            lat:obj.lat,
            long:obj.long
        });
    });

});

socket.on('update_intersection',function(name)
{
    console.log("Updating intersection");

  PgService.getIntersection(name,function (obj) {
        console.log("District is "+obj.district);
        io.emit('district',obj.district);
    });
});


});
