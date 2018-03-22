//Sample Implementation
  var BaseController = require('../controllers/BaseCRUDController')("scheduleBooking");

  var ScheduleBookingController = {
      method1 : function(){
        console.log("ako ay isang MerchantController at may method 1");
      }
  };
  ScheduleBookingController.__proto__ = BaseController;
  module.exports = ScheduleBookingController;
