const express = require("express"); //Import the express dependency
const mysql = require("mysql");
const app = express(); //Instantiate an express app, the main work horse of this server
import conInfo from "./secret";
const port = 5000; //Save the port number where your server will be listening
const con = mysql.createConnection(conInfo);

//Idiomatic expression in express to route and respond to a client request
app.get("/getOrders", (req, res) => {
  //get requests to the root ("/") will route here
  res.send("hi");
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
