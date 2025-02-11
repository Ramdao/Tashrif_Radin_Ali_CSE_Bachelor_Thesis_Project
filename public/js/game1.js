window.onload = function() {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

let question = ["q1", "q2", "q3"];
let answer = ["a1", "a2", "a3"];

var kick = new Audio("Assests\\sounds\\soccer-kick-6235.mp3");
var wrightgoal = new Audio("Assests\\sounds\\right goal.mp3");
var wronggoal = new Audio("Assests\\sounds\\wronggoal.mp3");
var winner = true;

// const request = new XMLHttpRequest();
// request.open("GET", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user");

// request.onload = function() {
//     if (request.status == 200) {
//         const response = JSON.parse(request.responseText);
//         var user = response[0];
//         let searchuser = JSON.parse(localStorage.getItem("user"));
//         for (let i = 0; i < response.length; i++) {
//             if (response[i].email == searchuser) {
//                 user = response[i];
//             }
//         }

//         // Store updated question, answer, and avatar data in localStorage
//         localStorage.setItem("question", JSON.stringify(user.questions));
//         localStorage.setItem("answer", JSON.stringify(user.answers));
//         localStorage.setItem("avatar", JSON.stringify(user.avatar));

//     } else {
//         console.error("Request failed with status:", request.status);
//     }
// };

// request.onerror = function() {
//     console.error("Network error occurred");
// };

// request.send();

// Retrieve and handle localStorage data for questions, answers, and avatar
question = JSON.parse(localStorage.getItem("question")) || ["q1", "q2", "q3"];
answer = JSON.parse(localStorage.getItem("answer")) || ["a1", "a2", "a3"];
avatar = JSON.parse(localStorage.getItem("avatar")) || "https://pixijs.com/assets/bunny.png";

// Ensure data integrity and default values if invalid data is found
if (question.length === 0 || answer.length === 0 || avatar === "") {
    question = ["q1", "q2", "q3"];
    answer = ["a1", "a2", "a3"];
    avatar = "https://pixijs.com/assets/bunny.png";
    alert("Data invalid");
}

// Set up your game or app logic here (rest of the code remains the same)
document.getElementById("Restart").disabled = true;
var score = 0;
goal = 5;
var randq = Math.floor(Math.random() * question.length);
var randa = Math.floor(Math.random() * 2);

// Ensure to regenerate questions and answers
function generate() {
    document.getElementById("question").innerHTML = question[randq];

    if (randa === 0) {
        document.getElementById("ans1").innerHTML = answer[randq];
        document.getElementById("ans2").innerHTML = answer[Math.floor(Math.random() * answer.length)];
        while (document.getElementById("ans1").innerHTML === document.getElementById("ans2").innerHTML) {
            document.getElementById("ans1").innerHTML = answer[randq];
            document.getElementById("ans2").innerHTML = answer[Math.floor(Math.random() * answer.length)];
        }
    } else if (randa === 1) {
        document.getElementById("ans1").innerHTML = answer[Math.floor(Math.random() * answer.length)];
        document.getElementById("ans2").innerHTML = answer[randq];
        while (document.getElementById("ans1").innerHTML === document.getElementById("ans2").innerHTML) {
            document.getElementById("ans1").innerHTML = answer[Math.floor(Math.random() * answer.length)];
            document.getElementById("ans2").innerHTML = answer[randq];
        }
    }
}

generate();
