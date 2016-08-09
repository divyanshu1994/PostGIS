var express=require('express');
var ejs=require('ejs');
var ejs_mate=require('ejs-mate');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var urlencoded=bodyParser.urlencoded({extended:true});
var socket=require('socket.io');
var util=require('util');
var main_route=require('./routes/gis');


var app= express();

app.use(express.static(__dirname+"/public"));
app.engine('ejs',ejs_mate);
app.set('view engine','ejs');
app.use(urlencoded);

app.use('/',main_route);


var server=app.listen(3000,function()
{
    console.log("Listening to server");
});



app.get('/',function(req,res,next)
{
    
    res.render('pghome', 
    {
        fields:'',
        db:'',
        table:''
    });
      
});
 

app.get('/map',function(req,res,next)
{
    res.render('pgmap',
    {
        map:'',
        fields:'',
        db:'',
        table:''
    });
})