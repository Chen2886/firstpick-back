var express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.use(express.json());

router.get("/orders", (req, response) => {
  var sql = `SELECT
    o.Order_ID,
    o.Date,
    o.Completed,
    c.First_Name,
    c.Last_Name, 
    c.Customer_ID,
    r.Name, 
    r.Price,
    r.Recipe_ID
  FROM 
    \`Order\` o 
    LEFT JOIN \`Order_Customer\` oc ON o.Order_ID = oc.Order_ID 
    LEFT JOIN \`Customer\` c ON oc.Customer_ID = c.Customer_ID 
    LEFT JOIN \`Recipe\` r ON o.Recipe_ID = r.Recipe_ID 
  ORDER BY o.Date, r.Price DESC`;

  con.query(sql.replace("\n", " "), (err, res) => {
    sendPacket(err, res, response);
  });
});

router.get("/ordersInfo", (req, response) => {
  var sql = `
  SELECT
    CONCAT(c.First_Name, " ", c.Last_Name) AS name,
    COUNT(*) AS num_orders,
    SUM(r.Price) AS spent
  FROM
    \`Order\` o,
    Order_Customer oc,
    Customer c,
    Recipe r
  WHERE
    o.Order_ID = oc.Order_ID
    AND oc.Customer_ID = c.Customer_ID
    AND o.Recipe_ID = r.Recipe_ID
  GROUP BY
    oc.Customer_ID
  ORDER BY
    spent DESC
  LIMIT 10;
  `;

  con.query(sql.replace("\n", " "), (err, res) => {
    sendPacket(err, res, response);
  });
});

router.delete("/orders", (req, response) => {
  // stored procedure
  var sql = "CALL deleteOrder(?);";
  con.query(sql, [req.body.Order_ID], (err, res) => {
    sendPacket(err, res, response);
  });
});

router.post("/orders", async (req, response) => {
  var sql =
    "INSERT INTO `Order` (Recipe_ID, Date, Completed) \
    VALUES (?,?,?)";

  con.query(sql, [req.body.Recipe_ID, req.body.date, 0], (err, res) => {
    if (req.body.Customer_ID !== undefined) {
      sql = "INSERT INTO `Order_Customer` (Order_ID, Customer_ID) VALUES (?,?)";
      con.query(sql, [res.insertId, req.body.Customer_ID]);
    }
    sendPacket(err, res, response);
  });
});

router.put("/orders", async (req, response) => {
  var sql = "UPDATE `Order` SET Recipe_ID = ?, Date = ? WHERE Order_ID = ?";

  con.query(
    sql,
    [req.body.Recipe_ID, req.body.date, req.body.Order_ID],
    (err, res) => {
      console.log(req.body.Customer_ID);
      if (req.body.Customer_ID === null) {
        sql = "DELETE FROM `Order_Customer` WHERE Order_ID = ?";
        con.query(sql, [req.body.Order_ID]);
      } else {
        sql =
          "INSERT INTO Order_Customer (Order_ID, Customer_ID) VALUES(?, ?) ON DUPLICATE KEY UPDATE Customer_ID = ?";
        con.query(sql, [
          req.body.Order_ID,
          req.body.Customer_ID,
          req.body.Customer_ID,
        ]);
      }
      sendPacket(err, res, response);
    }
  );
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
    response.send(res);
  }
};

module.exports = router;
