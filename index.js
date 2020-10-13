// FORM FUNCTIONS
const formElem = document.querySelector('form');

formElem.addEventListener('submit', (e) => {
  e.preventDefault();

  if(validateForm()) {
    console.log("nice")

    let request = new XMLHttpRequest();
    let image_url = signaturePad.toDataURL();
    request.open("POST", "https://www.quixi.com/signature_data");
    request.send(image_url)

    var formData = new FormData();
    formData.append('color', document.querySelector('.custom-select').value);
    formData.append('name', document.querySelector('#name').value);

    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);

    console.log(json);

    request = new XMLHttpRequest();
    request.open("POST", "https://www.quixi.com/internship-form");
    request.send(json);

    formElem.reset();
    signaturePad.clear();
    document.getElementById("error").innerHTML = "";
  }

});

// VALIDATING FORM
function validateForm() {
  var n = document.querySelector('#name').value;
  var c = document.querySelector('.custom-select').value;
  if (n == "" || c == "Open to select color" || signaturePad.isEmpty()) {
    var error = "";
    if(n == "") {
      error += "- type your name <br>"
    }
    if(c == "Open to select color") {
      error += "- select a color <br>"
    }
    if(signaturePad.isEmpty()) {
      error += "- sign your name <br>"
    }

    $('#error').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please do the following:</strong><br>'+ error + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    return false;

  }
  return true;
}

// CANVAS FUNCTIONS
var canvas = document.querySelector("canvas");

var signaturePad = new SignaturePad(canvas, {
    penColor: "black"
});

function changeColor(){
    var c = document.querySelector('.custom-select').value;
    if(c != "Open to select color")
      signaturePad.penColor = c
    else {
      signaturePad.penColor = "black";
    }
}
document.getElementById("color").onchange = changeColor;

document.getElementById('clear').addEventListener('click', function () {
  signaturePad.clear();
});

document.getElementById('undo').addEventListener('click', function () {
	var data = signaturePad.toData();
  if (data) {
    data.pop();
    signaturePad.fromData(data);
  }
});
