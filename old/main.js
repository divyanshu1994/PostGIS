var router=require('express').Router();
var postgis=require('../postgis');


router.post('/coords',function(req,res,next)
{
    var db=db=req.body.db;
    var gis=new postgis(db);
    
   gis.find_coords(req.body.query,function(data)
{

    
//console.log(data.features[0].geometry.coordinates[0][0]);

    var features=data.features;
    var coords=[];
    for(var i=0;i<features.length;i++)
    {
        var geo_type=features[i].geometry.type;
        var coordinates;
        if(geo_type=="Point")
        coordinates=features[i].geometry.coordinates;
        else if(geo_type=="MultiPolygon")
        coordinates=features[i].geometry.coordinates[0][0];
     //coordinates= convert(coordinates);
       console.log(coordinates);
        coords.push(coordinates);

        var type=features[i].geometry.type;

    }
    var a=1;
    res.render('result',{
        map:coords,
        type:type
    });

});
}); 

router.get('/',function(req,res,next)
{
    res.render('home');
}); 
var convert=function(args)
{
    
    return args;
}
module.exports=router;

