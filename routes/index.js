var express = require('express');
var router = express.Router();
var db = require('../Utilities/db');
var Stopwatch = require('../Utilities/stopwatch');
var stopWatch = new Stopwatch();
var infoMath = require('../Utilities/infoMath');
var mongo = require('mongodb')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Insert Method. Returns the task that was entered (indluding _id)
router.post('/api/update/insert', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = req.body;
  let newTask = {
    complete: false,
    task: "",
    owner: 0,
    assignees: [],
    creationDate: (new Date).getTime(),
    dueDate: 0,
    nodeRefs: []
  }

  // only add the task if there is a task string. a blank task is unusable
  if (data.task) {
    newTask.task = data.task
    if (data.dueDate) {
      newTask.dueDate = parseInt(data.dueDate);
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
    if (data.nodeRefs){
      if (array.isArray(data.nodeRefs)) {
        // verify that nodeRefs are valid nodes
        newTask.nodeRefs = nodeRefs;
      }
    }

    db.get().collection('tasks').insertOne(newTask, function (err, results) {
      if(err) {
        console.log("failed to insert");
        res.sendStatus(500);
      }
      else {
        console.log("inserted new node");
        res.status(200).send(JSON.stringify(results.ops[0]));
      }
    });
    
  }
});

router.post('/api/update/edit', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = req.body;
  var o_id = new mongo.ObjectID(data._id);
  let query = {_id:o_id};
  
  let newValues = {};

  // only add the task if there is a task string
  if (data._id) {
    if (data.dueDate) {
      newValues.dueDate = data.dueDate;
    }
    if (data.owner) {
      newValues.owner = data.owner;
    }
    if (data.assignees){
      if (array.isArray(data.assignees)) {
        // verify that the assignees exist in users
        newValues.assignees = data.assignees;
      }
    }
    if (data.dueDate) {
      newValues.dueDate = data.dueDate;
    }
    if (data.nodeRefs){
      if (array.isArray(data.nodeRefs)) {
        // verify that nodeRefs are valid nodes
        newValues.nodeRefs = nodeRefs;
      }
    }
    if (data.complete) {
      if (data.complete === "true") {
        newValues.complete = true;
      }
      else {
        newValues.complete = false;
      }
    }
  }

  db.get().collection('tasks').updateOne(query, {$set:newValues}, function (err, results) {
    if (!err){
      res.sendStatus(200);
      console.log("modified node");
      
    }
  });

});

router.post('/api/update/delete', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = req.body;
  var o_id = new mongo.ObjectID(data._id);
  let query = {_id:o_id};

  db.get().collection('tasks').deleteOne(query, function (err, results) {
    if (!err){
      console.log("deleted node")
      res.status(200).send(JSON.stringify(results.ops));
      
    }
    else {
      res.sendStatus(500);
    }
  });

});

// Search method. If no filters are passed, then all tasks will be returned.
router.get('/api/tasks', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let filters = req.query;

  if (Object.keys(filters).length) {
    let query = {};
    if (filters.task) {
      query.task = {$regex: filters.task};
    }
    if (filters.assignees) {
      let a = [];
      for (var assignee of filters.assignees) {
        a.push({assignees: assignee})
      }
      query.assignees = {$and: a}
    }
    if (filters.owner) {
      query.owner = {$regex: filters.owner};
    }
    if (filters.dueDate) {
      query.dueDate = {$gt:filters.dueDate[0], $lt:filters.dueDate[1]}
    }
    if (filters.creationDate) {
      query.creationDate = {$gt:filters.creationDate[0], $lt:filters.creationDate[1]}
    }
    if (filters.complete) {
      if (filters.complete === "true") {
        query.complete = true;
      }
      else {
        query.complete = false;
      }
    }

    db.get().collection('tasks').find(query).toArray(function (err, results){
      if (!err) {
        console.log(query);
        res.sets
        res.status(200).send(JSON.stringify({tasks:results}));
        
      }
      else {
        res.sendStatus(500);
      }
    });
  }
  
  else {
    // get all 
    console.log("No filters specified");
    db.get().collection('tasks').find({}).toArray(function (err, results){
      if (!err) {
        console.log("returning all nodes");
        res.status(200).send(JSON.stringify({tasks: results}));
      }
      else {
        res.sendStatus(500);
      }
    });
  }  
});
module.exports = router;
