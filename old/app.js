var express=require('express');
var ejs=require('ejs');
var ejs_mate=require('ejs-mate');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var urlencoded=bodyParser.urlencoded({extended:true});

var main_route=require('./routes/main');
var postgis=require('./postgis');
var gis=new postgis();

var app=express();

app.use(express.static(__dirname+"/public"));
app.engine('ejs',ejs_mate);
app.set('view engine','ejs');
app.use(urlencoded);

app.use('/',main_route);



app.listen(3000,function()
{
    console.log("Listening to server");
});