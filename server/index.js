// Subject :Repair & Maintenance Application
// this application is designed to facilitate staff in organization to report defects by inputting in the 
// this web base application.

var mysql = require('mysql');
const express =require('express');
const bodyparser=require ('body-parser');

var app=express();
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept")
	next()
	
});

var mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '!Home123',
  database : 'repair_maint'
  //multipleStatements: true
  
  });
 


  mysqlConnection.connect((err)=>{  
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connection failed \n error:'+ JSON.stringify(err, undefined, 2));
});

app.listen(3000, ()=> console.log('express server is running at port no.3000'));

// request for listing all records of repair order
app.get('/repair_order',(req, res)=>{
  mysqlConnection.query('SELECT * FROM repair_order', (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })

});

  // get specific repair order by id number
  app.get('/repair_order/:idrepair_order',(req, res)=>{
    mysqlConnection.query('SELECT * FROM repair_order WHERE idrepair_order=?',[req.params.idrepair_order], (err, rows, fields)=>{
      if(!err)
      res.send(rows);
      else
      console.log(err);
    })
});

// delete repair order by id number
app.delete('/repair_order/:idrepair_order',(req, res)=>{
  mysqlConnection.query('DELETE FROM repair_order WHERE idrepair_order=?',[req.params.idrepair_order], (err, rows, fields)=>{
    if(!err)
    res.send('DELETE SUCCESS');
    else
    console.log(err);
  })
});

 // insert repair_order
 app.post('/repair_order',(req, res)=>{
  /*var eid=req.body.idrepair_order;
  var elocation=req.body.location;
  var ebuilding=req.body.building;
  var erequest=req.body.requested_by;
  var econtact=req.body.contact_tel;
  var edescription=req.body.description;*/
  var eid=req.body.idrepair_order;
  var elocation=req.body.location;
  var ebuilding=req.body.BuildingName;
  var eday=req.body.day;
  var erequest=req.body.user;
  var econtact=req.body.tel;
  var edescription=req.body.description;
  console.log(elocation,ebuilding, erequest, econtact, edescription);
  
  //var sql="INSERT INTO repair_order (idrepair_order, empName, empAge, post, salary) VALUES (emp.idemployee,emp.empName, emp.empAge, emp.post, emp.salary)";
  var sql="INSERT INTO repair_maint.repair_order (idrepair_order, location, building, requested_by, contact_tel, description) VALUES  ('"+eid+"', '"+elocation+"', '"+ebuilding+"', '"+erequest+"', '"+econtact+"','"+edescription+"')";
  
 mysqlConnection.query(sql,(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});
