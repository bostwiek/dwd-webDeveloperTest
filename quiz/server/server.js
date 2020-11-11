// server.js File 
const express = require('express'); // Importing express module 
var cors = require("cors");
  
const app = express(); // Creating an express object 
const port = 8000;  // Setting an port for this application

app.use(cors());

const answerKey = [
	"1989", "Bioshock", "Gamecube", "Street%20Fighter",
	"Red", "Double%20Dragon", "16", "Link", "Saturn",
	"PlayStation", "Goldeneye", "Far%20Cry"
]
  
// Starting server using listen function 
app.listen(port, function (err) { 
   if(err){ 
       console.log("Error while starting server"); 
   } 
   else{ 
       console.log("Server has been started at "+port); 
   } 
}) 

// listen for get in base directory
app.get('/:name', function (req, res) {
	let searchName = answerKey.filter(e => e == req.params.name);
	
	res.send(searchName);
})