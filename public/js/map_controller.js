$(document).ready(function()
{
//var socket=io();

$("#map_addClick").click(function()
{
    var query=$("#query");
    var field=$("#field_name").val();
    var as=$("#field_as").val();
 
    
    query.append(""+field+" , ");
    if(as!=0)
    {
        query.append(" AS "+as);
    }
    
 
});
$("#map_conditionClick").click(function()
{
    var where=$("#where");
    var wh_field=$("#wh_field").val();
    var wh_choose=$("#wh_choose").val();
    var wh_condition=$("#wh_condition").val();

    if(where.html().length==0)
    {
        // first entry

        where.append(" WHERE "+wh_field);

        if(wh_choose=="equal")
            where.append("=");
        if(wh_choose=="greater")
            where.append(">");

     where.append("'"+wh_condition+"'");    
   

    }
    else{
          where.append(" AND "+wh_field);

        if(wh_choose=="equal")
            where.append("=");
        if(wh_choose=="greater")
            where.append(">");

        where.append("'"+wh_condition+"'");    

    }


});
$("#map_makeFinal").click(function()
{
    var db=$("#db").val();
    var table=$("#table").val();
    var query=$("#query").html();
    var from=" FROM "+$("#table").val();
    var geom_field=$("#geom_field").val();
    var where=$("#where").html();
    
    if(where.length==0)
    {
        where=1;
    }
    if(query.length==0)
    {
        query=1;
    }

    var q=query+from+where;
    alert(q);
    window.location.href = "http://localhost:3000/api/"+db+"/"+table+"/"+geom_field+"/"+query+"/"+where;
});



$("#direct_submit").click(function()
{
    var query=$("#direct_query").val();

     window.location.href = "http://localhost:3000/showTable?q="+query;
});

$("#map_submit").click(function()
{
    var query=$("#map_query").val();

     window.location.href = "http://localhost:3000/showMap?q="+query;
});

$("#distance_query").click(function()
{
    var tb1=$("#table1").val();
    var tb2=$("#table2").val();

    var info1=$("#info1").val();
    var info2=$("#info2").val();

    var query="SELECT ST_Distance(p1.the_geom,p2.the_geom)*69 AS distance "+
    "FROM "+tb1+" p1, "+tb2+" p2 "+
    "WHERE "+info1+" AND "+info2;

     window.location.href = "http://localhost:3000/showTable?q="+query;

});

$("#dwithin_query").click(function()
{
    var tb1=$("#dw_table1").val();
    var tb2=$("#dw_table2").val();
    
    var info1=$("#dw_info1").val();
    var info2=$("#dw_info2").val();

    var query="SELECT ST_Distance(p1.the_geom,p2.the_geom)*69 AS distance "+
    "FROM "+tb1+" p1 INNER JOIN "+tb2+" p2 "+
    " ON (ST_DWithin(p1.the_geom,p2.the_geom,(1.00/69))) "+
    "WHERE "+info1+" AND "+info2;

     window.location.href = "http://localhost:3000/showTable?q="+query;
});

});

