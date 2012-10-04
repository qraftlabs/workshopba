var url = require("url");
module.exports = function(registration){
  var price =  {
    "Normal": function(){
      if((new Date() - new Date(2012, 9, 15)) <= 0){
        return 700;
      }else{
        return 1000;
      }
    },
    "Estudiante": function() { return 500; },
    "Socio MUG": function() { return 500; },
    "Viajo desde el interior": function() { return 700; }
  }[registration.category]() * 100;

  var paymentUrl = url.format({
    protocol: "https",
    host: "checkout.dineromail.com",
    pathname: "CheckOut",
    query: {
      buyer_email: registration.email,
      merchant: "1758380",
      seller_name: "Buenos Aires Node.js Workshop",
      country_id: 1,
      payment_method_available: "all",
      item_name_1: "Workshop Ticket",
      item_quantity_1: "1",
      item_ammount_1: price,
      ok_url: "http://workshopba.jit.su/succeed",
      pending_url: "http://workshopba.jit.su/succeed"
    }
  });

  return paymentUrl;
};