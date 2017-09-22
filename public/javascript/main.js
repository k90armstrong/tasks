// classes below here
class Task {
    constructor(task, id, complete, creationDate, completionDate, assignees, owner, nodeRefs) {
        this.task = task;
        this.id = id;
        this.complete = complete;
        this.creationDate = creationDate;
        this.assignees = assignees;
        this.owner = this.owner;
        this.nodeRefs = nodeRefs;
    }
    check() {
        this.complete = true;
        return this;
    }
    uncheck() {
        this.complete = false;
        return this;
    }
}
// this is a singleton pattern implementation
var TaskSingleton = (function () {
    var instance;

    function createInstance() {
        var taskController = new TaskController();
        return taskController;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

class TaskController {

    constructor() {
        this.tasks = [];
    }

    addTask(task, id, complete, creationDate, completionDate, assignees, owner, nodeRefs) {
        var newTask = new Task(task, id, complete, creationDate, completionDate, assignees, owner, nodeRefs);
        this.tasks.push(newTask);
    }
}

// functions below here
function insertTaskAjax(task) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/update/insert',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            $('h1').html(data.msg);
            var newTask = new Task(data.task, )
        },
        data: task
    });
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function getAllTasks(cb) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/tasks',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tasks = JSON.parse(data);
            return cb(tasks);
        },
        data: {} // send nothing to get all tasks
    });
}

function getCompletedTasks(cb) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/tasks',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tasks = JSON.parse(data);
            return cb(tasks);
        },
        data: {
            complete: true
        } // send nothing to get all tasks
    });
}

function getUncompletedTasks(cb) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/tasks',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tasks = JSON.parse(data);
            return cb(tasks);
        },
        data: {
            complete: false
        } // send nothing to get all tasks
    });
}

// start of main 
$(document).ready(function () {

    document.getElementById('today').innerHTML = formatDate(new Date());
    // adding even handlers below here
    $('#add-task-button').click(function () {
        insertTaskAjax({
            task: $('#task').val()
        });
    });
    $('#see-completed-btn').click(function () {
        getCompletedTasks((tasks) => {
            console.log(tasks);
        });
    });
    $('#see-all-btn').click(function () {
        getAllTasks((tasks) => {
            console.log(tasks);
        });
    });
    $('#see-uncompleted-btn').click(function () {
        getUncompletedTasks((tasks) => {
            console.log(tasks);
        });
    });

    // main 
    // load the tasks
    $.ajax({
        url: 'http://192.168.30.245:2525/api/tasks',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tasks = JSON.parse(data);
            console.log(tasks);
        },
        data: {} // send nothing to get all tasks
    });
    // build them
});