$(function(){
  $("#register").submit(function(e){
    e.preventDefault();
    $.ajax({
      url: "/register",
      type: "post",
      data: $(this).serialize(),
      success: function(response){
        $(".register-form").hide();
        $(".success").show();
      }
    });

    return false;
  });
});