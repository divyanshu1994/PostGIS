$(document).ready(function()
{
//var socket=io();

$("#addClick").click(function()
{
    var query=$("#query");
    var field=$("#field_name").val();
    var as=$("#field_as").val();
 
    if(query.html().length==8)
    {
    query.append(" "+field);
    if(as!=0)
    {
        query.append(" AS "+as);
    }
    }
    else{
    query.append(", "+field);
    if(as!=0)
    {
        query.append(" AS "+as);
    }
    }
});
$("#conditionClick").click(function()
{
    var where=$("#where");
    var wh_field=$("#wh_field").val();
    var wh_choose=$("#wh_choose").val();
    var wh_condition=$("#wh_condition").val();

    if(where.html().length==7)
    {
        // first entry

        where.append(" "+wh_field);

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
$("#makeFinal").click(function()
{
    var query=$("#query").html();
    var from=" FROM "+$("#table").val();
    var where=$("#where").html();
    

    var q=query+from+where;
    alert(q);
    window.location.href = "http://localhost:3000/showTable?q="+q;
});



$("#direct_submit").click(function()
{
    var query=$("#direct_query").val();

     window.location.href = "http://localhost:3000/showTable?q="+query;
});

});

