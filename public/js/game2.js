window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
document.getElementById("restart").disabled=true;
var score = 0;
var question = ["q1", "q2", "q3"];
var answer = ["a1", "a2", "a3"];
var winner = true;
var catchnoise = new Audio("Assests\\sounds\\ping-pong-ball.mp3")
var cathnoise2 = new Audio ("Assests\\sounds\\ball-bounce-94853.mp3")
const request = new XMLHttpRequest();
// request.open("GET", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user");
    
//     request.onload = function() {
        
//         if (request.status == 200) {
//             const response = JSON.parse(request.responseText);
//             var user = response[0];
//             let searchuser = JSON.parse(localStorage.getItem("user"))
//             for (let i =0; i<response.length;i++){
//                 if(response[i].email==searchuser){
//                     user=response[i]
//                 }
//             }
//             localStorage.setItem("question", JSON.stringify(user.questions));
//             localStorage.setItem("answer", JSON.stringify(user.answers));
//             localStorage.setItem("avatar",JSON.stringify(user.avatar))
           
//         } else {
//             console.error("Request failed with status:", request.status);
//         }
       
//     };
    
//     request.onerror = function() {
//         console.error("Network error occurred");
//     };

//     request.send();

question=JSON.parse(localStorage.getItem("question")) 
answer=JSON.parse(localStorage.getItem("answer")) 
avatar=JSON.parse(localStorage.getItem("avatar"))

// question = question.replace(/\\/g, '');
// answer = answer.replace(/\\/g, '');

// question=JSON.parse(question)
// answer=JSON.parse(answer)
var question = JSON.parse(localStorage.getItem("question")) || ["q1", "q2", "q3"];
var answer = JSON.parse(localStorage.getItem("answer")) || ["a1", "a2", "a3"];
var avatar = JSON.parse(localStorage.getItem("avatar")) || "https://pixijs.com/assets/bunny.png";
if (question.length == 0 || answer.length == 0){
    question =["q1","q2","q3"];
    answer =["a1","a2","a3"];
    avatar = "https://pixijs.com/assets/bunny.png"
    alert("Data invalid");
}

var basictexts = [];
dropspeed =1.5;
sec =30;

var randq = Math.floor(Math.random() * question.length);
var randa = Math.floor(Math.random() * answer.length);
const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

let keys = {}; // for W A S D movement
let texture = PIXI.Texture.from("https://pixijs.com/assets/bunny.png");
texture=PIXI.Texture.from(avatar);

function createText() {
    const style = new PIXI.TextStyle({
        fill: ["red"],
    });
    randa = Math.floor(Math.random() * answer.length);
    const ans = answer[randa];
    document.getElementById("question").innerHTML = question[randq];

    const basicText = new PIXI.Text(ans, style);
    const position = Math.random() * (1000 - 100);
    basicText.position.set(position, 100);
    container.addChild(basicText);
    basictexts.push(basicText);
}

const player = new PIXI.Sprite(texture);
player.anchor.set(0.5);
player.position.set(app.screen.width / 2, 700);
player.width=40;
player.height=50;
container.addChild(player);


window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

function keydown(e) {
    keys[e.keyCode] = true;
}

function keyup(e) {
    keys[e.keyCode] = false;
}

function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();
    return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
    );
}



function restart(){
    if (winner){
        var data = {
            "email":JSON.parse(localStorage.getItem("user")),
            "xp":5
        } 
        const request = new XMLHttpRequest();
        request.open("POST", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user/add-xp");
    
        request.setRequestHeader("Access-Control-Allow-Credentials", "true");
        request.setRequestHeader("Content-Type", "application/json");
    
    
        request.send(JSON.stringify(data));
        
        
        localStorage.setItem("score",parseInt(localStorage.getItem("score"))+1)
    } else {
        localStorage.setItem("friendscore",parseInt(localStorage.getItem("friendscore"))+1)
    }
    
    
    for(let i = basictexts.length - 1; i >= 0; i--){
        container.removeChild(basictexts[i]);
        basictexts.splice(i, 1);
    }
    createText();
    dropspeed=1.5;
    sec=30;
    score=0;
    document.getElementById("back").disabled=false;
    document.getElementById("restart").style.backgroundColor="rgb(223, 90, 90)";
    document.getElementById("restart").disabled=true;
    document.getElementById("counter").innerHTML = score;
    winner=true;
}
function back(){
    window.location="Playarea.html";
}


counter =0;
app.ticker.add((delta) => {
    if (counter==0){
      createText();
      counter+=1;
    } 
    

    for (let i = basictexts.length - 1; i >= 0; i--) {
        basictexts[i].y += dropspeed;
        if (basictexts[i].y >= app.screen.height) {
            container.removeChild(basictexts[i]);
            basictexts.splice(i, 1);
            counter-=1;
        }
    }

    // D
    if (keys["65"]) {
        player.x -= 5;
    }
    // A
    if (keys["68"]) {
        player.x += 5;
    }

    for (let i = 0; i < basictexts.length; i++) {
        if (testForAABB(player, basictexts[i])) {

            if (randa==randq){
                catchnoise.play();
                container.removeChild(basictexts[i]);
                basictexts.splice(i, 1);
                counter-=1;
                score+=1
                randq = Math.floor(Math.random() * question.length);
            } else{
                cathnoise2.play();
                container.removeChild(basictexts[i]);
                basictexts.splice(i, 1);
                counter-=1;
                score-=1
            }
            document.getElementById("counter").innerHTML = score;
        }
    }
    if (score>=2){
        dropspeed=2
    }
    if (score>=5){
        document.getElementById("restart").disabled=false;
        document.getElementById("back").disabled=true;
        dropspeed=0;
        document.getElementById("result").innerHTML = "You won!";
    } else if (score<-3){
        document.getElementById("restart").disabled=false;
        document.getElementById("back").disabled=true;
        winner=false;
        dropspeed= 0;
        document.getElementById("result").innerHTML = "Your Friend won!";
    }
}); 