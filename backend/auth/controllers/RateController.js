//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("rate");

  var RateController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  RateController.__proto__ = BaseController;
  module.exports = RateController;
