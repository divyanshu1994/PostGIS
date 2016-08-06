var postgeo=require("postgeo");
var db_name;


function PostGis(db)
{
    this.db="Real-World";
    postgeo.connect("postgres://postgres@localhost:5432/"+db);
}


PostGis.prototype.find_coords=function(query,callback)
{   
    var coords=[];
    postgeo.query(query,"geojson",callback);

}


module.exports=PostGis;

