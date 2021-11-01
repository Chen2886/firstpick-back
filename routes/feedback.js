const express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.use(express.json());

//View Feedback
router.get("/feedback", (req, response) => {
    sql =
    'SELECT `Feedback_ID`, `Customer_ID`, `Rating`, `Comment` FROM `Feedback`';
  
    con.query(sql.replace("\n", " "), (err, res) => {
      if (err) {
        response.status(400);
        response.send(err);
      } else {
        response.send(res);
      }
    });
  });

//Add Feedback
router.post("/feedback", (req, response) => {
  var reqBody = req.body;
  const customerID = reqBody.Customer_ID;
  const rating = reqBody.Rating;
  const mycomment = reqBody.Comment; 

  var sql =
      'INSERT INTO `Feedback` \
  (Customer_ID, Rating, Comment) \
  VALUES \
  (' + con.escape(customerID) + ', \
  ' + con.escape(rating) + ', \
  ' + con.escape(mycomment) + ')';

  con.query(sql, function (err, result) {
      if (err) {
          response.send("Did not successfully add feedback to database");
      } else {
          response.send("Successfully added feedback into database");
      }
  });
});

  //update Feedback
  router.put("/feedback", (req, response) => {
    var reqBody = req.body;
    // const customerID = reqBody.Customer_ID;
    // const rating = reqBody.Rating;
    // const mycomment = reqBody.Comment; 

    var sql = "UPDATE `Feedback` SET Rating = ?, Comment = ? WHERE Feedback_ID = ?";
    //con.query(sql, [req.body.Rating, Comment, Feedback_ID]);

    con.query(sql, [reqBody.Rating, reqBody.Comment, reqBody.Feedback_ID], (err, res) =>
      sendPacket(err, res, response)
    );
    response.send("Updated successfully");
  });

//Delete Feedback
  router.delete("/feedback", (req, response) => {
    var sql = "DELETE FROM `Feedback` WHERE Feedback_ID=?";
    con.query(sql, [req.body.Feedback_ID]);
    response.send("Deleted")
});

module.exports = router;