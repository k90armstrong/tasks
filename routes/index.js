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

router.post('/api/update/insert', function(req, res, next) {
  let data = req.body;
  let newTask = {
    complete: false,
    task: "",
    owner: 0,
    assignees: [],
    creationDate: (new Date).getTime(),
    completionDate: 0,
    nodeRefs: []
  }

  // only add the task if there is a task string
  if (data.task) {
    newTask.task = data.task
    if (data.completionDate) {
      newTask.completionDate = data.completionDate;
    }
    if (data.owner) {
      newTask.owner = data.owner;
    }
    if (data.assignees){
      if (array.isArray(data.assignees)) {
        // verify that the assignees exist in users
        newTask.assignees = data.assignees;
      }
    }
    if (data.completionDate) {
      newTask.completionDate = data.completionDate;
    }
    if (data.nodeRefs){
      if (array.isArray(data.nodeRefs)) {
        // verify that nodeRefs are valid nodes
        newTask.nodeRefs = nodeRefs;
      }
    }

    db.get().collection('tasks').insertOne(newTask, function (err, response) {
      if(err) {
        console.log("failed to insert");
      }
      else {
        res.send(JSON.stringify({inserted: response.ops}));
      }
    });
    
  }
});

router.post('/api/update/edit', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = req.body;
  let newTask = {
    complete: false,
    task: "",
    owner: 0,
    assignees: [],
    creationDate: (new Date).getTime(),
    completionDate: 0,
    nodeRefs: []
  }

  // only add the task if there is a task string
  if (data.task) {
    newTask.task = data.task
    if (data.completionDate) {
      newTask.completionDate = data.completionDate;
    }
    if (data.owner) {
      newTask.owner = data.owner;
    }
    if (data.assignees){
      if (array.isArray(data.assignees)) {
        // verify that the assignees exist in users
        newTask.assignees = data.assignees;
      }
    }
    if (data.completionDate) {
      newTask.completionDate = data.completionDate;
    }
    if (data.nodeRefs){
      if (array.isArray(data.nodeRefs)) {
        // verify that nodeRefs are valid nodes
        newTask.nodeRefs = nodeRefs;
      }
    }
  }
});

router.get('/api/tasks', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let filters = req.query;

  if (Object.keys(filters).length) {
    let query = {};
    if (filters.task) {
      query.task = {$regex: filters.task};
    }
    if (filters.assignees.length > 0) {
      let a = [];
      for (var assignee of filters.assignees) {
        a.push({assignees: assignee})
      }
      query.assignees = {$and: a}
    }
    if (filters.owner > 0) {
      query.owner = {$regex: filters.owner};
    }
    if (filters.completionDate.length === 2) {
      query.completionDate = {$gt:filters.completionDate[0], $lt:filters.completionDate[1]}
    }
    if (filters.creationDate.length === 2) {
      query.creationDate = {$gt:filters.creationDate[0], $lt:filters.creationDate[1]}
    }

    db.get().collection('tasks').find(query).toArray(function (err, results){
      if (!err) {
        res.json(JSON.stringify({tasks:results}));
      }
    });
    
  }
  
  else {
    // get all 
    console.log("empty filters");
    db.get().collection('tasks').find({}).toArray(function (err, results){
      if (!err) {
        res.json(JSON.stringify({tasks: results}));
      }
    });
  }  
});
module.exports = router;
