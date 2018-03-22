//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("dtr");

  var DTRController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  DTRController.__proto__ = BaseController;
  module.exports = DTRController;
