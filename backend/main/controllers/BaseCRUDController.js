/**
Author: Anthony D. Teoxon
Contributors:
*/
var BaseCRUDController = {
  name: null,
  model: null,
  route: "",
  listFields: {},
  index: function(callback){
    console.log(this.listFields);
    this.model.find({},function (err, list) {
        callback(err, list);
    });
  },
  view: function(id, callback){
    this.model.findById(id,function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  save: function(obj, callback){
    var mod = this.model;
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  /*
  SAMPLE:
  id: "somerandomalphanumeric"
  fieldsAndData: {field1: "field1", field2: "field2"}
  */
  update: function(id , fieldsAndData , callback){
    this.model.findByIdAndUpdate(id, { $set: fieldsAndData} ,function (err, singleObject) {
      console.log(JSON.stringify(err));
      console.log(JSON.stringify(singleObject));
        callback(err, singleObject);
    });
  },
  delete: function(id, callback){
    this.model.findByIdAndRemove(id,function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(seachCriteria, callback){
    var lf = this.listFields;
    if(seachCriteria.pageNo != null || seachCriteria.numOfRecords != null){
        var pNo = seachCriteria.pageNo;
        var pNumRec = seachCriteria.numOfRecords;

        delete seachCriteria.pageNo;
        delete seachCriteria.numOfRecords;
        //conosole.log(JSON.stringify(seachCriteria));
        this.searchWithPagination(seachCriteria, pNo , pNumRec ,callback);
    }else{
      this.model.find(seachCriteria,  function (err, list) {
          //console.log("HERE.... " + this.listFields);
          callback(err, list, list.length);
      }).limit(10);
    }
  },
  searchWithPagination: function(seachCriteria, pageNo, numOfRecords ,callback){
    var lf = this.listFields;
        pageNo = pageNo || 0;
        numOfRecords = numOfRecords || 20;
    this.model.count(seachCriteria, function(err, count){
      this.model.find(seachCriteria,  function (err, list) {
          //console.log("HERE.... " + this.listFields);
          callback(err, list, count);
      }).skip(pageNo * numOfRecords).limit(numOfRecords);
    });
  },
  count: function(seachCriteria, callback){
    this.model.count(seachCriteria, function(err, count){
        callback(err, count);
    });
  }
}

module.exports = function(modelName){
  var model = require('../models/' + modelName);//model must exist
  var EmptyController = {};
  var Controller = Object.create(BaseCRUDController);
    Controller.__proto__ = BaseCRUDController;
    Controller.model = model;
    Controller.name = model || null;
  return Controller;
}
