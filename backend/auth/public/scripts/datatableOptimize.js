function datatableOptimize(url, type){
  var url = url;
  var type = type;
$('#myTable').dataTable({
    "ajax":{
        "url" : url,
        "type" :type,
        "data" : {},
        "responsive": "true",
    },
    "columns" : [
      {"data": "pickUpLocation"},
      {"data": "destination"},
      {"data": "distance"},
      {"data": "price"}


    ]
});
}
