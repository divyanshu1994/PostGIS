var pg=require('pg');

function PgApp(name,password)
{
    this.authString = "postgres://"+name+":"+password+"@127.0.0.1/";
}

PgApp.prototype.showTable =function (db,quer,callback)
{
   

    //remove everything after from
    var n=quer.indexOf("FROM");
    var str=quer.substring(0,n-1);

    //remove select
    var str2=str.replace("SELECT","");

    // since functions like st distanc econtains , inside we have to first remove that comma
    var com1=str2.indexOf("ST_Distance");
    if(com1!=-1)
    {
        var start=com1;
        console.log(com1);
        for(var i=com1;i<str2.length;i++)
        {
            if(str2[i]==',')
            {
                str2=str2.substr(0,i)+str2.substring(i+1);
                console.log(str2);
                break;
            }
        }
    }
    
    var s=str2.split(",");
    var outputs=[];

    for(var i=0;i<s.length;i++)
    {   s[i]=s[i].replace(" ","");

        var c=s[i].indexOf("AS");

        // if there is AS in field then  get that 
        if(c!=-1)
        {
            s[i]=s[i].substring(c+2,s[i].length);
         
        }
           s[i]=s[i].replace(" ","");
           

    
     outputs.push(s[i].toLowerCase().replace(" ",""));
    }
    

    for(var i=0;i<outputs.length;i++)
    {
        console.log("Outputs :")
        console.log(outputs[i]);
        if(outputs[i]=="count(*)")
        {
            outputs[i]="count";
        }
        if(outputs[i].indexOf("st_x")!=-1)
        {
            outputs[i]="st_x";
        }
        if(outputs[i].indexOf("st_y")!=-1)
        {
            outputs[i]="st_y";
        }
    }

  
 console.log("Auth "+this.authString);
var conString=this.authString+db;
    pg.connect(conString, function(err, client, done){
     // handle err here
       if(err)
          {  console.log("Error : "+err);

              return callback({
                err:err
              });
          }

          else{

     client.query(quer, function(err, result) {
          // handle err here
        if(err)
          {
              console.log("Error : "+err);
              return callback({
                err:err
              });
          }

            console.log("success");
             console.log(result.rows);

              callback({data:result.rows,outputs:outputs});

            done(); // don't forget this to have the client returned to the pool
     });
    }
});
    

}

PgApp.prototype.getCols=function(db,tbl_name,callback)
{
    var conString=this.authString+db;
 

pg.connect(conString, function(err, client, done){
     // handle err here
       if(err)
          {  console.log("Error : "+err);

              return callback({
                err:err
              });
          }
          else{
     client.query("select column_name ,data_type from information_schema.columns where table_name='"+tbl_name+"'",
      function(err, result) {
          // handle err here
          if(err)
          {              console.log("Error : "+err);

              return callback({
                err:err
              });
          }
            console.log("success");
            // console.log(result.rows);

            callback({data:result.rows});
            done(); // don't forget this to have the client returned to the pool
     });
}
});

}


module.exports=PgApp;