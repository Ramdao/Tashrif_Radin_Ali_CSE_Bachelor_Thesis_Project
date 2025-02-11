window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
var winner = true
document.getElementById("left").disabled = true;
document.getElementById("right").disabled = true;
document.getElementById("Restart").disabled = true;

timerc=setInterval(timer, 1000);
let questions =["q1","q2","q3"];
let answers =["a1","a2","a3"]
var cards = new Audio("Assests\\sounds\\flipcard-91468.mp3")
var card2 = new Audio("Assests\\sounds\\cardsound32562-37691.mp3")

const request = new XMLHttpRequest();
request.open("GET", "http://localhost:5000/user");
    
    request.onload = function() {
        
        if (request.status == 200) {
            const response = JSON.parse(request.responseText);
            var user = response[0];
            let searchuser = JSON.parse(localStorage.getItem("user"))
            for (let i =0; i<response.length;i++){
                if(response[i].email==searchuser){
                    user=response[i]
                }
            }
            localStorage.setItem("question", JSON.stringify(user.questions));
            localStorage.setItem("answer", JSON.stringify(user.answers));
            
           
        } else {
            console.error("Request failed with status:", request.status);
        }
       
    };
    
    request.onerror = function() {
        console.error("Network error occurred");
    };

    request.send();


function back(){
    timerc=setInterval(timer, 1000);
    score=0;
    starttimer=5;
    sec =30;
    document.getElementById("score").innerText=score;
    document.getElementById("counter").style.color="white";
    window.location="Playarea.html";
}


questions=JSON.parse(localStorage.getItem("question")) 
answers=JSON.parse(localStorage.getItem("answer")) 

questions = questions.replace(/\\/g, '');
answers = answers.replace(/\\/g, '');

questions=JSON.parse(questions)
answers=JSON.parse(answers)

if (questions.length == 0 || answers.length == 0){
    questions =["q1","q2","q3"];
    answers =["a1","a2","a3"];
    alert("Data invalid");
}

var correct = Math.floor(Math.random()*2);
var check = Math.floor(Math.random()*questions.length)
var sec =30;
var starttimer=5;
var score =0;
function generate(){
    correct = Math.floor(Math.random()*2);
    check = Math.floor(Math.random()*questions.length)
    document.getElementById("question").innerText = questions[check]
if (correct ==0){
    document.getElementById("left").innerHTML=answers[check]
    document.getElementById("right").innerHTML=answers[Math.floor(Math.random()*questions.length)]

    while(document.getElementById("left").innerHTML===document.getElementById("right").innerHTML){
        document.getElementById("right").innerHTML=answers[Math.floor(Math.random()*questions.length)]
    }
    
} else{
    document.getElementById("left").innerHTML=answers[Math.floor(Math.random()*questions.length)]
    document.getElementById("right").innerHTML=answers[check]

    while(document.getElementById("left").innerHTML===document.getElementById("right").innerHTML){
        document.getElementById("left").innerHTML=answers[Math.floor(Math.random()*questions.length)]
    }

    
}
}

function timer(){
    document.getElementById("counter").innerHTML = starttimer;
    starttimer--;
    if (starttimer<0){
        document.getElementById("left").disabled = false;
        document.getElementById("right").disabled = false;
        document.getElementById("counter").style.color="rgb(9, 209, 101)";

        document.getElementById("counter").innerHTML=sec;
        sec--;
     if (sec<15){
        document.getElementById("counter").style.color="yellow";
        }
        if (sec<10){
        document.getElementById("counter").style.color="red";
        }
        if(sec<0){
        clearInterval(timerc);
        document.getElementById("back").disabled = true;
        document.getElementById("Restart").disabled = false;
        document.getElementById("counter").innerText="TIMES UP";
        document.getElementById("left").disabled = true;
        document.getElementById("right").disabled = true;
        if (score >=20){
            document.getElementById("result").innerHTML = "You won!"
        } else{
            winner = false;
            document.getElementById("result").innerHTML = "Your friend won!"
        }
    }
    }
    
}

generate();


function restart(){
    if (winner){
        var data = {
            "email":JSON.parse(localStorage.getItem("user")),
            "xp":5
        } 
        const request = new XMLHttpRequest();
        request.open("POST", "http://localhost:5000/user/add-xp");
    
        request.setRequestHeader("Access-Control-Allow-Credentials", "true");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
        localStorage.setItem("score",parseInt(localStorage.getItem("score"))+1)

    } else {
        localStorage.setItem("friendscore",parseInt(localStorage.getItem("friendscore"))+1)

    }
   
    timerc=setInterval(timer, 1000);
    score=0;
    starttimer=5;
    sec =30;
    document.getElementById("score").innerText=score;
    document.getElementById("counter").style.color="white";
    document.getElementById("Restart").disabled = true;
    document.getElementById("back").disabled = false;
    document.getElementById("result").innerHTML = "Get at least 20 points!"
    winner = true;
}

function left(){
   
   if (correct==0){
    cards.play();
    score+=1;   
   } else {
    if (score == 0){
        score = 0;
    } else{
        card2.play();
        score-=1;
    }
    
   }
   document.getElementById("score").innerText=score;
   generate();
   console.log(correct)
}
function right(){
   
    if (correct==1){
        cards.play();
        score+=1;
 
    } else{
        if (score == 0){
            score = 0;
        } else{
            card2.play();
            score-=1;
        }
    }
    document.getElementById("score").innerText=score;
    generate();
    console.log(correct)
 }