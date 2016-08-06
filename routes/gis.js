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



module.exports=router;

