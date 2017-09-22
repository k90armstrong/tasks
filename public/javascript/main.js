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
function insertTaskAjax(task, cb) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/update/insert',
        type: 'post',
        dataType: 'json',
        success: function (task) {
            return cb(task);
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
            var tasks = data;
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
            var tasks = data;
            return cb(tasks);
        },
        data: {
            complete: true
        } // send nothing to get all tasks
    });
}

function getIncompleteTasks(cb) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/tasks',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tasks = data;
            return cb(tasks);
        },
        data: {
            complete: false
        } // send nothing to get all tasks
    });
}

function addTaskElement(task) {
    var li = document.createElement("li");
    var div = document.createElement("div");
    div.id = task._id;
    // add click even to the div
    $(div).click(changeChecked);
    div.className = "checkbox";
    li.appendChild(div);
    var label = document.createElement("label");
    div.appendChild(label);
    var input = document.createElement("INPUT");
    input.type = "checkbox";
    input.checked = task.complete;
    label.appendChild(input);
    var strong = document.createElement("strong");
    strong.innerHTML = task.task;
    strong.className = 'marker-font';
    label.appendChild(strong);
    // apped task to ul
    $('#tasks').append(li);
}

function addAllTaskElements(tasks) {
    tasks.tasks.forEach((task) => {
        addTaskElement(task);
    });
}

function clearAllTaskElements(task) {
    $('#tasks').empty();
}

function changeChecked() {
    console.log('hi');
    var checked = $(this.firstChild.firstChild).is(':checked');
    console.log(checked);
    $.ajax({
        url: 'http://192.168.30.245:2525/api/update/edit',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            // do an alert thingy??
        },
        data: {
            _id: this.id,
            complete: checked
        }
    });
}

function clearBtnSelected() {
    $('#see-incomplete-btn').removeClass('btn-info');
    $('#see-completed-btn').removeClass('btn-info');
    $('#see-all-btn').removeClass('btn-info');
}

function openSnackBar(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);

}
// start of main 
$(document).ready(function () {
    document.getElementById('today').innerHTML = formatDate(new Date());
    // adding even handlers below here
    $('#add-task-btn').click(function () {
        insertTaskAjax({
            task: $('#task').val(),
            dueDate: new Date($('#date-picker').val()).getTime()
        }, (task) => {
            //clear the input box
            $('#task').val('');
            $('#date-picker').val('');
            // add the new task to the 
            addTaskElement(task);
            openSnackBar('Task was created! Hurry and complete it!');
        });
    });
    $('#see-completed-btn').click(function () {
        console.log('see complete');
        clearBtnSelected();
        $('#see-completed-btn').addClass('btn-info');
        getCompletedTasks((tasks) => {
            clearAllTaskElements();
            addAllTaskElements(tasks);
        });
    });
    $('#see-all-btn').click(function () {
        console.log('see all');
        clearBtnSelected();
        $('#see-all-btn').addClass('btn-info');
        getAllTasks((tasks) => {
            clearAllTaskElements();
            addAllTaskElements(tasks);
        });
    });
    $('#see-incomplete-btn').click(function () {
        console.log('see uncomplete');
        clearBtnSelected();
        $('#see-incomplete-btn').addClass('btn-info');
        getIncompleteTasks((tasks) => {
            clearAllTaskElements();
            addAllTaskElements(tasks);
        });
    });
    // load the tasks when page loads
    $('#see-all-btn').click();
});