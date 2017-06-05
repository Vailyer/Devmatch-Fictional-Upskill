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
    submitBtn.val("Processing").prop('disabled', true);
    
  //Collect credit card fields
  var ccNum = $('#card_number').val(),
    cvcNum = $('#card_code').val,
    expMonth = $('#card_month').val(),
    expYear = $('#card_year').val;
    
  //Use Stripe JS library to check for card errors
  var error = false;
  
  //Validate card number
  if(!Stripe.card.validateCardNumber(ccNum)){
    error=true;
    alert('Invalid CVC number')
  }
  
  //Validate expiration date
  if(!Stripe.card.validateExpiry(expMonth, expYear)){
    error=true;
    alert('Invalid expiry date')
  }
  
  //Validate card number
  if(!Stripe.card.validateCVC(cvcNum)){
    error=true;
    alert('Invalid credit card number')
  }
  
  
  if(error) {
    //If there are card errors dont send to Stripe
    submitBtn.prop('disabled', true).val("Sign Up")
  } else {
    //Send card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum(),
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  }
    
  //Send card info to Stripe.
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum(),
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
  return false;
  });
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    //Get the token from the response
    var token = response.id;
    
    //Inject the card token into hidden field.
    theForm.append( $('<input type ="hidden" name="user[Stripe_card_token]">').val(token) )
    
    //Submit form to our Rails app
    theForm.get(0).submit();
    
  }

  //Submit form to our Rails app
});