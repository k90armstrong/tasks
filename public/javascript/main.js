$.ajax({
    url: 'http://localhost:2525/api/update/insert',
    type: 'post',
    dataType: 'json',
    success: function (data) {
        $('h1').html(data.msg);
    },
    data: {task: "Change the filter"}
});