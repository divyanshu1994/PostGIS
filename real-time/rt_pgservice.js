var pg=require('pg');

function PgApp(name,password)
{
    this.authString = "postgres://"+name+":"+password+"@127.0.0.1/";
}

PgApp.prototype.create=function(name,lat_long,callback)
{
    db="Delhi";
    table="rt";

var conString=this.authString+db;
    pg.connect(conString,function(err,client,done)
    {
        if(err)
        {
             console.log("error in db "+err);
           return callback(err);
        }
        else{
            client.query("INSERT INTO rt(name, geom) VALUES('"+name+"', ST_GeomFromText('POINT("+lat_long+")', 4326));",
            function(err,results)
            {
                if(err)
                {
                                        console.log("error in query "+err);
                  return  callback({
                      err:err
                    });
                }
                else{
                    console.log("Inserted");
                    callback({
                        data:results.rows
                    });
                    done(); 
                }   
            });
        }
    });
}

PgApp.prototype.update=function(name,lat_long,callback)
{
    db="Delhi";
    table="rt";

var conString=this.authString+db;
    pg.connect(conString,function(err,client,done)
    {
        if(err)
        {
           return callback(err);
        }
        else{
            client.query("UPDATE rt SET geom = ST_GeomFromText('POINT("+lat_long+")',0) WHERE name = '"+name+"'",
            function(err,results)
            {
                if(err)
                {
                  return  callback({
                      err:err
                    });
                }
                else{
                   // console.log("Updated");
                    callback({
                        data:results.rows
                    });
                    done(); 
                }   
            });
        }
    });
}
PgApp.prototype.getUser=function(name,callback)
{    db="Delhi";

    var conString=this.authString+db;

      pg.connect(conString,function(err,client,done)
    {
        if(err)
        {
           return callback(err);
        }
        else{
            client.query("SELECT ST_X(geom),ST_Y(geom) from rt WHERE name='"+name+"'",
            function(err,results)
            {
                if(err)
                {
                  return  callback(err);
                }
                else{
                    
                    console.log("DATA Returned : Lat "+results.rows[0].st_y+" Long "+results.rows[0].st_x);
                    
                    callback({
                        lat:results.rows[0].st_y,
                        long:results.rows[0].st_x
                    });
                    done(); 
                }   
            });
        }
    });
}

PgApp.prototype.getIntersection=function(name,callback)
{
        var conString=this.authString+"Delhi";

    var query="SELECT p1.district from districts p1 , rt p2 where st_within(p2.geom,p1.geom) AND p2.name='"+name+"'";
console.log(query);
     pg.connect(conString,function(err,client,done)
    {
        if(err)
        {
            console.log("Error in db connection");
           return callback(err);
        }
        else{
            client.query(query,
            function(err,results)
            {
                if(err)
                {
                    console.log("Error in intersection : "+err)
                  return  callback(err);
                }
                else{
                    
                    
                    // callback({
                    //     lat:results.rows[0].st_y,
                    //     long:results.rows[0].st_x
                    // });
                    var district;
                    if(results.rows[0])
                    {   
                        district=results.rows[0].district;
                        console.log("District : "+district);
                    }
                    else{
                        district="No"
                    }
                    callback({
                        district:district
                    });
                    done(); 
                }   
            });
        }
    });

}
module.exports=PgApp;