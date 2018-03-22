var methodGet = "GET";
var methodPost = "POST";
var methodDelete = "DELETE";
function ajaxRequest(url, dataToProcess, method, callback){
	$.ajax({
		url: url,
		type: method,
		data: dataToProcess,
		dataType: 'json',
		success: function (data) {
			callback(data);
		},
		error: function (err) {
			console.log(JSON.stringify(err));
		}
	});
}
function clearFormText(){
  $("#txtTaxiRate").val('');
  $("#txtTotalDistance").val('');
  $("#txtRatePerDistance").val('');
  $("#txtWaitingTime").val('');
  $("#txtRatePerWaiting").val('');
}

function passIdUrl(url, dataToProcess, callback){
  ajaxRequest(url, dataToProcess, methodDelete, function(results){
    callback(results);

  });
}

$(document).on("click", "#btnDelete", function(){
        $('#myModal').modal('show')
        var id = $(this).attr("data-id");
        $('#idVal').val(id);
  });
