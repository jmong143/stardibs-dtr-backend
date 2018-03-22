/*function dataview(id){
  var id = id;
  $.ajax({
      type:"GET",
      url:"http://localhost:4008/reservation"+id,

      dataType: 'json',
     success:function (doc){
       $('#dataview').html("");
       $.each(doc.data, function(index, myData ){
         $('#dataview').append('<a href="#" class="list-group-item" id="'+ myData._id +'">'+
             '<i class=""></i>Location  ' + myData.pickUpLocation +
             '<i class=""></i> Distance ' + myData.destination +
             '<i class=""></i> Price ' + myData.price +
             '<span class="pull-right text-muted small"><em>'+myData.createdAt+'</em>' +
             '</span>' +
         '</a>');

///<a href="#" class="list-group-item">
    <i class="fa fa-comment fa-fw"></i>New Comment
    <span class="pull-right text-muted small"><em>4 minutes ago</em>
    </span>
</a>




       });
  }
  });
}
*/
