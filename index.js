// import
const express = require("express"); //Import the express dependency
const sqlConnection = require("./sqlConnection");
var cors = require('cors');
const port = 5000; // localhost port

const app = express(); //Instantiate an express app, the main work horse of this server
app.use(cors())
// import order.js
app.use(require("./routes/order"));

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
