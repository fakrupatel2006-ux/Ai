async function translateText(){

const text =
document.getElementById("inputText").value;

const from =
document.getElementById("fromLang").value;

const to =
document.getElementById("toLang").value;

if(text.trim()===""){
alert("Please enter text");
return;
}

const url =
`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

try{

const response =
await fetch(url);

const data =
await response.json();

document.getElementById("outputText").value =
data[0][0][0];

}
catch(error){

document.getElementById("outputText").value =
"Translation Failed";

}

}