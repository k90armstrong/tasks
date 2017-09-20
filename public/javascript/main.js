
// load the tasks
// build them

$('button').click(function(){
    insertTaskAjax({task: $('#task').val()});
});
function insertTaskAjax (task) {
    $.ajax({
        url: 'http://192.168.30.245:2525/api/update/insert',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            $('h1').html(data.msg);
        },
        data: task
    });
}
