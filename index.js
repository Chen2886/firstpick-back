// import
const express = require("express"); //Import the express dependency
const sqlConnection = require("./sqlConnection");
var cors = require("cors");

const app = express(); //Instantiate an express app, the main work horse of this server
app.use(cors());
// import order.js
app.use(require("./routes/order"));
// import customer.js
app.use(require("./routes/customer"));
// import feedback.js
app.use(require("./routes/feedback"));
// import inventory.js
app.use(require("./routes/inventory"));

app.listen(4500, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port 4500`);
});
