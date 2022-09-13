let wort = document.querySelector('input[name="wort"]');
let verschiebungswert = document.querySelector('input[name="verschiebung"]');

let textencode = document.querySelector("#encoding");
let encode = document.getElementById("encode");
let decode = document.getElementById("decode");

let finalresult = document.querySelector("#ergebnis");

var finalizedencoded;

encode.addEventListener("click", function (event) {
  console.log(wort.value);
  console.log(verschiebungswert.value);

  finalizedencoded = transformtext(wort.value, verschiebungswert.value);
  var li = document.createElement("li");
  li.className = "eintrag list-group-item";
  li.innerText = finalizedencoded;
  finalresult.appendChild(li);
});

decode.addEventListener("click", function (event) {
  var temp = 1;
  temp *= -verschiebungswert.value;

  // verschiebungswert.value *= -verschiebungswert.value;
  var decodedtext = transformtext(finalizedencoded, temp);
  var li = document.createElement("li");
  li.className = "eintrag list-group-item";
  li.innerText = decodedtext;
  finalresult.appendChild(li);
});

var kleinStart = "a".charCodeAt(0);
var kleinEnd = "z".charCodeAt(0);
var grossStart = "A".charCodeAt(0);
var grossEnd = "Z".charCodeAt(0);

function transformtext(text, verschiebung1) {
  var ergebnis = "";

  for (var i = 0; i < text.length; i++) {
    var valuedCode = text.charCodeAt(i);

    if (valuedCode >= grossStart && valuedCode <= grossEnd) {
      // if its like "A, B"
      valuedCode = transformchar(valuedCode, grossStart, verschiebung1);
    } else if (valuedCode >= kleinStart && valuedCode <= kleinEnd) {
      // if its like "a, b "
      valuedCode = transformchar(valuedCode, kleinStart, verschiebung1);
    }
    ergebnis += String.fromCharCode(valuedCode);
  }

  return ergebnis;
}


/*
wichtig: Buchstabenanzahl: 26 
Buchstabe b -> im char ist es 98 

wir starten bei -> 97 
98 - 97 => 1 und das ist B 

Addieren noch dazu die VErschiebung "temp" 

*/
function transformchar(charCode, startAsciiCode, temp) {
  var temporary = parseInt(temp, 10); // parse to int
  var index = charCode - startAsciiCode;  
  var codeTransformed = index + temporary;
  if (codeTransformed > 25) {
    codeTransformed -= 26;
  } else if (codeTransformed < 0) {
    codeTransformed += 26;
  }

  return startAsciiCode + codeTransformed;
}
