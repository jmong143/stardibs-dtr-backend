//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("notification");

  var NotificationController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  NotificationController.__proto__ = BaseController;
  module.exports = NotificationController;
