var express = require("express");
var router = express.Router();
const Titles = require("../models/titles");

/* GET Oldest Employee page. */
router.get("/", function (req, res, next) {
  Titles.aggregate([
    { $match: {} },
    { $project: { time: { $subtract: [{ $dateFromString: { dateString: "$to_date" } }, { $dateFromString: { dateString: "$from_date" } }] } } },
    {
      $group: {
        _id: null,
        durationAvg: { $avg: "$time" }
      }
    }
  ], (err, result) => {
    if (err) {
      console.log(err.message);
      return;
    }
    // console.log(result)
    const date = new Date(result[0].durationAvg);
    const time = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDay()
    }

    // console.log(time);
    res.render("avgDuration", { time });
  });
});

module.exports = router;
