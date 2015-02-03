function validationYandexWallet(){
  var input = $('input[type=text]');
  var inputFormField = $('.JS-InputForm');
  
  var success = input.on('keyup', function(){
    var value = input.val();
    
    if(value.length == 0){
      inputFormField.removeClass('has-success').removeClass('has-error');
    }
    
    var success = checkYandexWallet(value);
    
    if(success && value.length > 0){
      inputFormField.removeClass('has-error').addClass('has-success');
    }else if(!success){
      inputFormField.removeClass('has-success').addClass('has-error');
    }
  });
  
  function checkYandexWallet(value){
    var minLength = 11;
    var maxLength = 26;

    if (value === undefined || value.length === 0) {
      return true;
    }

    var length = value.length,
        N = value.charAt(0).toString(),
        X = value.substr(1, N),
        Z = value.substr(length - 2, 2).toString(),
        Y = value.substr((N + X).length, length - (N + X + Z).length);

    var xArray = X.split('').reverse();
    var yArray = Y.split('').reverse();
    var result = 0;
    var a = 70;
    for (var index = 0; index < 20; index++) {
      var yValue = yArray[index];
      var tValue = (yValue == undefined || yValue == 0) ? 10 : yValue;
      result = (result + (tValue * a) % 99) % 99;
      a = (13 * a) % 99;
    }

    for (var index = 0; index < 10; index++) {
      var xValue = xArray[index];
      var tValue = (xValue == undefined || xValue == 0) ? 10 : xValue;
      result = (result + (tValue * a) % 99) % 99;
      a = (13 * a) % 99;
    }

    result += 1;

    result = result < 10 ? "0" + result : result;

    if (length < minLength || length > maxLength || N === "0" || Z === "00" || result != Z || Y.length > 20) {
      return false;
    }

    return true;
  }
};

$( document ).ready(function() {
  validationYandexWallet();
});
