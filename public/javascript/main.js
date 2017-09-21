
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
function insertTaskAjax (task) {
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
<<<<<<< HEAD
}


$( document ).ready(function() {

    console.log( "ready!" );
    // adding even handlers below here
    $('button').click(function(){
        insertTaskAjax({task: $('#task').val()});
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
=======
}
>>>>>>> 2adc29716fbf5db07e6255843881eddb6b65c947
