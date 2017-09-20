var express = require('express');
var router = express.Router();
var db = require('../Utilities/db');
var Stopwatch = require('../Utilities/stopwatch');
var stopWatch = new Stopwatch();
var infoMath = require('../Utilities/infoMath');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/update/insert', function(req, res, next) {
  console.log(req.params.data);
  res.send("yo!")
  // var data = [];
  // stopWatch.start();
  // db.get().all(`SELECT Value as val, UPI as id, Time as time
  //           FROM datastore WHERE UPI=? AND TIME >= ? AND TIME <= ?`, 
  //           [req.params.upi, req.params.starttime, req.params.endtime], (err, rows) => {
  //   if (err) {
  //     console.error(err.message);
  //     res.end(err.message);
  //     return next();
  //   }
  //   data = rows;
  //   for (var d of data) {
  //     d.time = new Date(d.time * 1000.0);
  //   }
  //   data = infoMath.resample(data, req.params.operation, req.params.delta);
  //   var l = data.length;
  //   stopWatch.stop();
  //   res.render('table', {time: stopWatch.getTimeFormatted(), length: l, dataObject: JSON.stringify(data)});
  // });
});
module.exports = router;
