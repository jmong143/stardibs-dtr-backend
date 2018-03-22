//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("history");

  var TransactionHistoryController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };

  TransactionHistoryController.__proto__ = BaseController;
  module.exports = TransactionHistoryController;
