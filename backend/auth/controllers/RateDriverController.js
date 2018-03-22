//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("rateDriver");

  var RateDriverController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  RateDriverController.__proto__ = BaseController;
  module.exports = RateDriverController;
