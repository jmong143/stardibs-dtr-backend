//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("reservation");

  var ReservationController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  ReservationController.__proto__ = BaseController;
  module.exports = ReservationController;
