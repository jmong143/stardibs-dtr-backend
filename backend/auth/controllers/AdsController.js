//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("ads");

  var AdsController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  AdsController.__proto__ = BaseController;
  module.exports = AdsController;
