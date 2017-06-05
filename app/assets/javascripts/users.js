/* global $, Stripe*/
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks form submit button .
  submitBtn.click(function(event){
  //Prevent default submit behaviour.
    event.preventDefault();
    
  //Collect credit card fields
  var ccNum = $('#card_number').val(),
    cvcNum = $('#card_code').val,
    expMonth = $('#card_month').val(),
    expYear = $('#card_year').val;
  //Send card info to Stripe.
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum(),
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
  });
  
  //Collect credit card fields
  //Send card info to Stripe.
  //Start will return a card token.
  //Inject card token as hidden field into form.
  //Submit form to our Rails app
});