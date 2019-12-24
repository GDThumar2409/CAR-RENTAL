var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var multer = require('multer');
const fileUpload = require('express-fileupload');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const DIR = '../assets/adminphotos';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;  //.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
})


var upload = multer({
  storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/car_rental", { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', mongoConnected);

function mongoConnected() {
	var userschema = new mongoose.Schema({
		email_id: String,
		firstname: String,
		lastname: String,
		phoneno: Number,
		password: String,
	}, {collection : 'users'});

	var Item = new mongoose.Schema(
		{ name:String,
		  class:String,
		  fuelType:String,
		  transmission:String,
		  seats:Number,
		  photoname: String,
	  
	   } , {collection : 'Cars'}
	  );

	  var Offers = new mongoose.Schema(
		{ name:String,
		  Discount:String,
		  Discription:String
	  
	   } , {collection : 'Offers'}
	  );

	  var Trip = new mongoose.Schema(
		{ endtime:String,
		  enddate:String,
		  startdate:String,
		  starttime:String,
	  
	   } , {collection : 'Trip'}
	  );

	  var Trip = mongoose.model('Trip',Trip);
	  var Offers = mongoose.model('Offers',Offers);
	var Item = mongoose.model('Car',Item);
	var Users = mongoose.model("Users", userschema);

	app.get("/allcars", (req, res) => {
		Item.find( function(err, cars) {
		  if (err) {
			res.status(400);
			res.send("Unable to find Cars");
		  }
		  else {
			console.log("All Cars Returned");
			console.log(cars);
			res.send(cars);
		  }
		});
	  });


	app.get("/alluser", (req, res) => {
		Users.find( function(err, employees) {
			if (err) {
				res.status(400);
				res.send("Unable to find names");
			}
			else {
				console.log("All employees returned");
				res.json(employees);
			}
		});
	});

	app.get("/login/:email_id/:password",(req, res) => {
		//console.log(req);
		console.log(req.params.email_id);
		console.log(req.params.password);
		Users.findOne( {'email_id':req.params.email_id}, function(err, usr) {
			if (err) {
				console.log("Unable to find an employee");
				res.status(400);
				res.send("Unable to find an employee");
			}
			else if(usr.password == req.params.password){
				console.log("login successfull");
				res.json({ "message": "login successfull"});
			}
		});
	});

	app.get("/find/:email_id", (req, res) => {
		//console.log(req);
		//console.log(req.params.email_id);
		Users.findOne( {'email_id':req.params.email_id}, function(err, usr) {
			if (err) {
				console.log("Unable to find an employee");
				res.status(400);
				res.send("Unable to find an employee");
			}
			else if(usr == null){
				console.log("emp is null");
				res.status(400);
				res.send(usr);
			}
			else {
				console.log(usr);
				console.log("Employee record returned");
				res.send(usr);
			}
		});
	});

	// Signup
	app.post("/adduser", (req, res) => {
		var myData = new Users(req.body);
		console.log(req.body);
		Users.findOne({'email_id':myData.email_id},function(err,result){
			if(err){
				res.json({ "message": "Error Accured"});
			}
			else if(result){
				res.json({ "message": "Email Already In System"});
			}
			else{
				myData.save( function(err) {
					if (err) {
						res.status(400);
						res.send("Unable to add names");
					}
					else {	
						res.status(200);
						console.log("Employee added!");
						console.log(myData);
						res.json({ "message": "Employee record saved successfully"});
					}
				});
			}
		});
		
	});


	app.post("/addoffer", (req, res) => {
		var myData = new Offers(req.body);
		console.log(req.body);
		Users.findOne({'name':myData.name},function(err,result){
			if(err){
				res.json({ "message": "Error Accured"});
			}
			else if(result){
				res.json({ "message": "Offer Already In System"});
			}
			else{
				myData.save( function(err) {
					if (err) {
						res.status(400);
						res.send("Unable to add Offer");
					}
					else {	
						res.status(200);
						console.log("Offer added!");
						console.log(myData);
						res.json({ "message": "Offer record saved successfully"});
					}
				});
			}
		});
		
	});

	app.delete("/deleteoffer/:name", (req, res) => {
		//console.log("req.params.id");
		console.log(req.params.name);
		Offers.findOne( {name : req.params.name}, function(err, itm) {
		  if (err) {
			res.status(400);
			res.send("Unable to find an Car");
		  }
		  else {
			itm.deleteOne( function(err) {
			  if (err) {
				console.log("Unable to remove Car");
				res.status(400);
				res.send("Unable to remove Car");
			  }
			  console.log("Offer removed!");
			  res.send({"message" : "Offer removed!"});
			});
		  }
		});
	  });

	  app.get("/getoffer/:name", (req, res) => {
		Offers.findOne( {name :req.params.name}, function(err, itm) {
		  if (err) {
			console.log("Unable to find an employee");
			res.status(400);
			res.send("Unable to find an employee");
		  }
		  else {
			console.log("Employee record returned");
			res.send(itm);
		  }
		});
	  });


	  app.put("/updateoffer", (req, res) => {
		console.log(req.body.name);
		Offers.findOne( {name : req.body.name}, function(err, itm) {
		  if (err) {
			console.log("No Car with given id found!");
			res.status(400);
			res.send("No Car with given id found!");
		  }
		  itm.name = req.body.name;
		  itm.Discription = req.body.Discription;
		  itm.Discount=req.body.Discount;
		  
		  itm.save( function(err) {
			if (err) {
			  console.log("Unable to update Offer");
			  res.status(400);
			  res.send("Unable to update Offer");
			}
			else {
			  console.log("Offer record updated successfully");
			  res.send({"message":"Offer record updated successfully"});
			}
		  });
		});			
	  });


	  //trip api
	  app.post("/addtrip", (req, res) => {
		var myData = new Trip(req.body);
		console.log(req.body);
		myData.save( function(err) {
			if (err) {
				res.status(400);
				res.send("Unable to add Offer");
			}
			else {	
				res.status(200);
				console.log("Offer added!");
				console.log(myData);
				res.json({ "message": "Trip record saved successfully"});
			}
		});
		
	});

	//cars api

	app.post('/addcar',upload.single('photo'),function(req,res){
		//console.log(req.file.photo.name);
		//console.log(req.body);
	  var newItem = new Item(req.body);
	  //console.log(newItem);
	  //newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
	  // newItem.name=req.files.userPhoto.name;
	  // newItem.img.name=req.files.userPhoto.name;
	  // newItem.img.data=req.files.userPhoto.data;
	  // newItem.img.contentType = 'image/png';
	  
	  newItem.save(function(err) {
		if (err) {
		  res.status(400);
		  res.send("Unable to add car");
		}
		else {
	  
		  res.status(200);
		  console.log("Car added!");
		  console.log(newItem);
		  res.json({ "message": "Employee record saved successfully"});
		}
	  });
	  //res.send("ok");
	  });
	  
	  // app.get('/api/photo/:name',function(req,res){
	  //   console.log(req.params.name);
	  //   Item.findOne({name : req.params.name},function(err,ph){
	  //     //res.sendfile(ph.img.data);
	  //     var mime=ph.img.contentType;
	  //     res.writeHead(200, {'Content-Type': mime});
	  //     res.end(ph.img.data, 'binary');
	  //     console.log("file returned");
	  //   })
	  // })
	  
	  
	  app.get("/allcars", (req, res) => {
		Item.find( function(err, cars) {
		  if (err) {
			res.status(400);
			res.send("Unable to find Cars");
		  }
		  else {
			console.log("All Cars Returned");
			console.log(cars);
			res.send(cars);
		  }
		});
	  });
	  
	  
	  app.post('/api/upload',upload.single('photo'), function (req, res) {
		console.log("calling uploader");
		if (!req.file) {
			console.log("No file received");
			return res.send({
			  success: false
			});
		
		  } else {
			console.log('file received successfully');
			return res.send({
			  success: true
			})
		  }
	  });
	  
	  app.delete("/deletecar/:photoname", (req, res) => {
		//console.log("req.params.id");
		console.log(req.params.photoname);
		Item.findOne( {photoname : req.params.photoname}, function(err, itm) {
		  if (err) {
			res.status(400);
			res.send("Unable to find an Car");
		  }
		  else {
			let path=DIR+"/"+req.params.photoname;
			fs.unlink(path,function(err){
			  if(err) return console.log(err);
			  console.log('file deleted successfully');
		 });
			itm.deleteOne( function(err) {
			  if (err) {
				console.log("Unable to remove Car");
				res.status(400);
				res.send("Unable to remove Car");
			  }
			  console.log("Car removed!");
			  res.send({"message" : "Car removed!"});
			});
		  }
		});
	  });
	  
	  app.get("/getcar/:name", (req, res) => {
		Item.findOne( {name :req.params.name}, function(err, itm) {
		  if (err) {
			console.log("Unable to find an employee");
			res.status(400);
			res.send("Unable to find an employee");
		  }
		  else {
			console.log("Employee record returned");
			res.send(itm);
		  }
		});
	  });
	  
	  
	  app.put("/updatecar", (req, res) => {
		console.log(req.body.name);
		Item.findOne( {name : req.body.name}, function(err, itm) {
		  if (err) {
			console.log("No Car with given id found!");
			res.status(400);
			res.send("No Car with given id found!");
		  }
		  itm.name = req.body.name;
		  itm.class = req.body.class;
		  itm.fuelType=req.body.fuelType;
		  itm.transmission=req.body.transmission;
		  itm.seats=req.body.seats;
		  let phn=itm.photoname;
		  itm.photoname=req.body.photoname;
		  
		  itm.save( function(err) {
			if (err) {
			  console.log("Unable to update Car");
			  res.status(400);
			  res.send("Unable to update Car");
			}
			else {
			  let path=DIR+"/"+phn;
			  fs.unlink(path,function(err){
			  if(err) return console.log(err);
			  console.log('file deleted successfully');
			  });
			  console.log("Car record updated successfully");
			  res.send({"message":"Car record updated successfully"});
			}
		  });
		});			
	  });

	  app.get("/alloffers", (req, res) => {
		Offers.find( function(err, cars) {
		  if (err) {
			res.status(400);
			res.send("Unable to find Offers");
		  }
		  else {
			console.log("All Offers Returned");
			console.log(cars);
			res.send(cars);
		  }
		});
	  });

}
app.listen(8000);