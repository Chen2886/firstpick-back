var express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.use(express.json());

router.get("/orders", (req, response) => {
  var resData = {};
  var fail = false;

  var sql =
    "SELECT \
    o.Order_ID, \
    o.Date, \
    o.Completed, \
    c.First_Name, \
    c.Last_Name, \
    r.Name, \
    r.Price \
  FROM \
    `Order` o \
    LEFT JOIN `Order_Customer` oc ON o.Order_ID = oc.Order_ID \
    LEFT JOIN `Customer` c ON oc.Customer_ID = c.Customer_ID \
    LEFT JOIN `Recipe` r ON o.Recipe_ID = r.Recipe_ID \
  WHERE o.Completed = 1 \
  ORDER BY o.Date";

  con.query(sql.replace("\n", " "), (err, res) => {
    if (err) {
      response.status(400);
      response.send(err);
      fail = true;
    } else {
      resData.Completed = res;
    }
  });

  if (fail) return;

  sql =
    "SELECT \
      o.Order_ID, \
      o.Date, \
      o.Completed, \
      c.First_Name, \
      c.Last_Name, \
      r.Name, \
      r.Price \
    FROM \
      `Order` o \
      LEFT JOIN `Order_Customer` oc ON o.Order_ID = oc.Order_ID \
      LEFT JOIN `Customer` c ON oc.Customer_ID = c.Customer_ID \
      LEFT JOIN `Recipe` r ON o.Recipe_ID = r.Recipe_ID \
    WHERE o.Completed = 0 \
    ORDER BY o.Date";

  con.query(sql.replace("\n", " "), (err, res) => {
    if (err) {
      response.status(400);
      response.send(err);
    } else {
      resData.Current = res;
      response.send(resData);
      console.log(resData);
    }
  });
});

router.post("/complete", (req, response) => {
  var sql = "UPDATE `Order` SET Completed = 1 WHERE Order_ID = ?";

  con.query(sql, [req.body.Order_ID], (err, res) =>
    sendPacket(err, res, response)
  );
});

router.post("/undo", (req, response) => {
  var sql = "UPDATE `Order` SET Completed = 0 WHERE Order_ID = ?";

  con.query(sql, [req.body.Order_ID], (err, res) =>
    sendPacket(err, res, response)
  );
});

sendPacket = (err, res, response) => {
  if (err) {
    response.status(400);
    response.send(err);
  } else {
    console.log(res);
    response.send(res);
  }
};

module.exports = router;
