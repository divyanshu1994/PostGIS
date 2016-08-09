var router=require('express').Router();
var pg = require("pg");
var pgapp=require('../pgapp');
var server=require('../server');

var socket=require('socket.io');

var PgApp;



router.get('/showTable',function(req,res,next){
PgApp=new pgapp("postgres","himdib");
PgApp.showTable("Real-World",req.query.q,function(obj)
{
    if(obj.err)
    {
        console.log("E "+obj.err);
       return res.render('error',{
            err:obj.err
        })
    }
  res.render('pgresult',{
        data:obj.data,
        outputs:obj.outputs,
       
    });
});

});

router.get('/api/:db/:table/:geom/:query/:where',function(req,res,next){
PgApp=new pgapp("postgres","himdib");
var query=(req.params.query==1)?'':req.params.query;
var where=(req.params.where==1)?'':req.params.where;
PgApp.api_map(req.params.db,"SELECT "+query+" (ST_AsGeoJSON("+req.params.geom+")) as geomtry from "+req.params.table+" "+where,function(obj)
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

     res.render('pgmap',
     {
         map:data,
        fields:'',
        db:'',
        table:''
    });
  
});

});

router.post('/getCols',function (req,res,next) {
    PgApp=new pgapp("postgres","himdib");
    PgApp.getCols(req.body.db, req.body.table,function(obj)
    {
    if(obj.err)
    {
        
        return res.render('error',{
            err:obj.err
        })
    }


        res.render('pghome',{
            fields:obj.data,
            table:req.body.table,
            db:req.body.db
        })
    });
});


router.post('/getMapCols',function (req,res,next) {
    PgApp=new pgapp("postgres","himdib");
    PgApp.getCols(req.body.db, req.body.table,function(obj)
    {
    if(obj.err)
    {
        
        return res.render('error',{
            err:obj.err
        })
    }


        res.render('pgmap',{
            fields:obj.data,
            table:req.body.table,
            db:req.body.db,
            map:''
        })
    });
});



module.exports=router;

