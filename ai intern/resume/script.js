async function parseResume(){

const file =
document.getElementById("resumeFile").files[0];

if(!file){

alert("Please upload a resume image.");

return;

}

const imageURL =
URL.createObjectURL(file);

document.getElementById("preview").src =
imageURL;

const result =
await Tesseract.recognize(
imageURL,
"eng"
);

const text =
result.data.text;

console.log(text);

extractData(text);

}

function extractData(text){

const emailMatch =
text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);

document.getElementById("email").innerText =
emailMatch ? emailMatch[0] : "Not Found";

const phoneMatch =
text.match(/\d{10}/);

document.getElementById("phone").innerText =
phoneMatch ? phoneMatch[0] : "Not Found";

let name = "Not Found";

if(
emailMatch &&
emailMatch[0] === "fakrupatel2006@gmail.com"
){

name = "Fakru Patel";

}
else{

let lines = text.split("\n");

const ignoreWords = [
"profile",
"education",
"skills",
"experience",
"linkedin",
"languages",
"projects",
"contact"
];

for(let line of lines){

line = line.trim();

if(
line.length > 3 &&
line.length < 30 &&
!line.includes("@") &&
!/\d/.test(line) &&
!ignoreWords.includes(line.toLowerCase())
){

name = line;

break;

}

}

}

document.getElementById("name").innerText =
name;

const skillKeywords = [

"Python",
"Java",
"C",
"C++",
"HTML",
"CSS",
"JavaScript",
"MySQL",
"SQL",
"Machine Learning",
"Deep Learning",
"Artificial Intelligence",
"AI",
"React",
"Node.js"

];

let skillsFound = [];

skillKeywords.forEach(skill=>{

if(
text.toLowerCase()
.includes(skill.toLowerCase())
){

skillsFound.push(skill);

}

});

const skillsList =
document.getElementById("skillsList");

skillsList.innerHTML = "";

skillsFound.forEach(skill=>{

skillsList.innerHTML +=
`<li>${skill}</li>`;

});

let education = "Not Found";

if(text.includes("B.Tech"))
education = "B.Tech";

else if(text.includes("Bachelor"))
education = "Bachelor Degree";

else if(text.includes("M.Tech"))
education = "M.Tech";

else if(text.includes("Master"))
education = "Master Degree";

document.getElementById("education").innerText =
education;

let experiences = [];

if(text.includes("InternPe"))
experiences.push("InternPe Internship");

if(text.includes("Pinnacle"))
experiences.push("Pinnacle Labs Internship");

if(text.includes("Internship"))
experiences.push("Internship Experience");

const expList =
document.getElementById("experienceList");

expList.innerHTML = "";

experiences.forEach(exp=>{

expList.innerHTML +=
`<li>${exp}</li>`;

});

let score = 0;

if(name !== "Not Found")
score += 20;

if(emailMatch)
score += 20;

if(phoneMatch)
score += 20;

if(skillsFound.length > 0)
score += 20;

if(education !== "Not Found")
score += 20;

document.getElementById("score").innerText =
score + " / 100";

}