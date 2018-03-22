function dataTabledynamic(tableName, url, type, data, columns){
    var url = url;
    var type = type;
    var data = data;
    var columns = columns;
    var tableName = tableName;
$(tableName).dataTable({
    "ajax":{
        "url" : url,
        "type" : type,
        "data" : data,
        "responsive": "true",
    },
    "columns" : columns
      });

}
