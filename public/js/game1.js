
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

let question =["q1","q2","q3"];
let answer =["a1","a2","a3"];

var kick = new Audio("Assests\\sounds\\soccer-kick-6235.mp3")
var wrightgoal = new Audio("Assests\\sounds\\right goal.mp3")
var wronggoal = new Audio("Assests\\sounds\\wronggoal.mp3")
var winner = true;

// const request = new XMLHttpRequest();
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

// question=JSON.parse(localStorage.getItem("question"))
// answer=JSON.parse(localStorage.getItem("answer"))
// avatar=JSON.parse(localStorage.getItem("avatar"))

// question = question.replace(/\\/g, '');
// answer = answer.replace(/\\/g, '');

// question=JSON.parse(question)
// answer=JSON.parse(answer)
avatar = "https://pixijs.com/assets/bunny.png"
if (question.length == 0 || answer.length == 0 || avatar == ""){
    question =["q1","q2","q3"];
    answer =["a1","a2","a3"];
    avatar = "https://pixijs.com/assets/bunny.png"
    alert("Data invalid");
}

document.getElementById("Restart").disabled=true;
var score =0;

goal =5;
var randq = Math.floor(Math.random()*question.length);
var randa = Math.floor(Math.random()*2);

function generate(){
    document.getElementById("question").innerHTML =question[randq];

if (randa===0){
    document.getElementById("ans1").innerHTML = answer[randq]
    document.getElementById("ans2").innerHTML = answer[ Math.floor(Math.random()*answer.length)]
    while(document.getElementById("ans1").innerHTML===document.getElementById("ans2").innerHTML){
        document.getElementById("ans1").innerHTML = answer[randq]
        document.getElementById("ans2").innerHTML = answer[ Math.floor(Math.random()*answer.length)]
    }
    
} else if (randa === 1){
    document.getElementById("ans1").innerHTML = answer[ Math.floor(Math.random()*answer.length)]
    document.getElementById("ans2").innerHTML = answer[randq]
    while(document.getElementById("ans1").innerHTML===document.getElementById("ans2").innerHTML){
        document.getElementById("ans1").innerHTML = answer[ Math.floor(Math.random()*answer.length)]
        document.getElementById("ans2").innerHTML = answer[randq]
    }
    
}

}

generate()

const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);


const texture = PIXI.Texture.from(avatar);
const texture2 = PIXI.Texture.from("Assests\\post.png") ;
//player
const player = new PIXI.Sprite(texture);
player.width=40;
player.height=50;
player.anchor.set(0.5)

player.position.set(100,200);
player.acceleration = new PIXI.Point(0);
player.mass = 1;

const mouseCoords = { x: 0, y: 0 };

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('mousemove', (event) =>
{
    mouseCoords.x = event.global.x;
    mouseCoords.y = event.global.y;
});

container.addChild(player);





const movementSpeed = 0.05;
const impulsePower = 5;
//collision 
function testForAABB(object1, object2)
{
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}
function collisionResponse(object1, object2)
{
    if (!object1 || !object2)
    {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
        
    );
    
}

function distanceBetweenTwoPoints(p1, p2)
{
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

// enemy
const texture3 = PIXI.Texture.from("Assests\\output-onlinepngtools.png");
const enemyplayer = new PIXI.Sprite(texture3);
enemyplayer.acceleration = new PIXI.Point(0);
enemyplayer.mass = 3;
enemyplayer.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
enemyplayer.anchor.set(0.5, 0.5)
enemyplayer.width=80;
enemyplayer.height=75;
// GOAL1
const hit2 = new PIXI.Sprite(texture2);
hit2.position.set(app.screen.width-300,450);
hit2.width=150;
hit2.height=450;
// Goal2
const hit = new PIXI.Sprite(texture2);
hit.position.set(app.screen.width-300,-20);
hit.width=150;
hit.height=450;

container.addChild(hit);
container.addChild(hit2);
container.addChild(enemyplayer);
var rotationspeed=0.001;

//friend
const Texture = PIXI.Texture.from("https://pixijs.com/assets/bunny.png");
const friend = new PIXI.Sprite(Texture);
friend.width = 55;
friend.height = 50;
friend.anchor.set(0.5);
friend.x = 1400;
friend.y = 100;
friend.mass = 1;
container.addChild(friend);


function restart(){
    if(winner){
        localStorage.setItem("score",parseInt(localStorage.getItem("score"))+1)
        var data = {
            "email":JSON.parse(localStorage.getItem("user")),
            "xp":5
        } 
        const request = new XMLHttpRequest();
        request.open("POST", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user/add-xp");
    
        request.setRequestHeader("Access-Control-Allow-Credentials", "true");
        request.setRequestHeader("Content-Type", "application/json");
    
    
        request.send(JSON.stringify(data));
    } else{
        localStorage.setItem("friendscore",parseInt(localStorage.getItem("friendscore"))+1)
    }
    
    
    
    score=0;
    document.getElementById("Restart").style.backgroundColor="rgb(223, 90, 90)";
    document.getElementById("counter").innerHTML=score;
    document.getElementById("back").disabled = false;
    document.getElementById("Restart").disabled = true;
    winner =true;
}

function back(){
  
    window.location="Playarea.html";
}



var flag = true;

app.ticker.add((delta) =>
{
    if(score>=2){
        if (flag){
            if (friend.y!=850){
                friend.y+=1.5;
            } else {
                flag=false;
            }
        
           }
    
            if (!flag){
                if (friend.y!=100){
                    friend.y-=1.5;
                } else{
                    flag=true;
                }
            }
        
    }
       
    
    // Applied deacceleration for both squares, done by reducing the
    // acceleration by 0.01% of the acceleration every loop
    player.acceleration.set(player.acceleration.x * 0.99, player.acceleration.y * 0.99);
    enemyplayer.acceleration.set(enemyplayer.acceleration.x * 0.99, enemyplayer.acceleration.y * 0.99);
    enemyplayer.rotation+= rotationspeed;
    // Check whether the green square ever moves off the screen
    // If so, reverse acceleration in that direction
    if (enemyplayer.x < 0 || enemyplayer.x > (app.screen.width - 100))
    {
        enemyplayer.acceleration.x = -enemyplayer.acceleration.x;
        rotationspeed+=0.005;
        
    }

    if (enemyplayer.y < 0 || enemyplayer.y > (app.screen.height - 100))
    {
        enemyplayer.acceleration.y = -enemyplayer.acceleration.y;
    }

    // If the green square pops out of the cordon, it pops back into the
    // middle
    if ((enemyplayer.x < -30 || enemyplayer.x > (app.screen.width + 30))
        || enemyplayer.y < -30 || enemyplayer.y > (app.screen.height + 30))
    {
        enemyplayer.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
    }

    // If the mouse is off screen, then don't update any further
    if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0)
    {
        // Get the red square's center point
        const playercenter = new PIXI.Point(
            player.x + (player.width * 0.5),
            player.y + (player.height * 0.5),
        );

        // Calculate the direction vector between the mouse pointer and
        // the red square
        const toMouseDirection = new PIXI.Point(
            mouseCoords.x - playercenter.x,
            mouseCoords.y - playercenter.y,
        );

        // Use the above to figure out the angle that direction has
        const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x,
        );

        // Figure out the speed the square should be travelling by, as a
        // function of how far away from the mouse pointer the red square is
        const distmouseplayer = distanceBetweenTwoPoints(
            mouseCoords,
            playercenter,
        );
        const playerspeed = distmouseplayer * movementSpeed;

        // Calculate the acceleration of the red square
        player.acceleration.set(
            Math.cos(angleToMouse) * playerspeed,
            Math.sin(angleToMouse) * playerspeed,
        );
    }

    // If the character and ball hits
    if (testForAABB(enemyplayer, player))
    {
        // Calculate the changes in acceleration that should be made between
        // each square as a result of the collision
        const collisionPush = collisionResponse(enemyplayer, player);
        // Set the changes in acceleration for both squares
        kick.play();
        player.acceleration.set(
            (collisionPush.x * enemyplayer.mass),
            (collisionPush.y * enemyplayer.mass),
        );
        enemyplayer.acceleration.set(
            -(collisionPush.x * player.mass),
            -(collisionPush.y * player.mass),
            
        );
    }

    if (testForAABB(enemyplayer, friend))
    {
        const collisionPush = collisionResponse(enemyplayer, player);
        kick.play();
        enemyplayer.acceleration.set(
            -(collisionPush.x * player.mass),
            -(collisionPush.y * player.mass),
            
        );
    }
    //with goal
    if(testForAABB(enemyplayer,hit)){
        if (randa==0 && score!=goal){
            wrightgoal.play();
            score+=1;
            document.getElementById("counter").innerHTML=score;
        } else if (score <= -3) {
            document.getElementById("counter").innerHTML="Friend won";
            document.getElementById("Restart").style.background="rgb(9, 209, 101)";
            document.getElementById("Restart").disabled=false;
            document.getElementById("back").disabled = true;
            winner=false;

        } else if(randa!=0 && score!=goal) {
            wronggoal.play();
            score-=1;
            document.getElementById("counter").innerHTML=score;
        } 

        if (score==goal){
            document.getElementById("counter").innerHTML="goal reached";
            document.getElementById("Restart").style.background="rgb(9, 209, 101)";
            document.getElementById("Restart").disabled=false;
            document.getElementById("back").disabled = true;
        }
        randq = Math.floor(Math.random()*question.length);
        randa = Math.floor(Math.random()*2);
        generate()

        
        rotationspeed=0.001;
        enemyplayer.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);


    }
    //goal2
    if(testForAABB(enemyplayer,hit2)){
        if (randa==1 && score!=goal){
            wrightgoal.play();
            score+=1;
            document.getElementById("counter").innerHTML=score;
        } else if (score <= -3) {
            document.getElementById("counter").innerHTML="Friend won!";
            document.getElementById("Restart").style.background="rgb(9, 209, 101)";
            document.getElementById("Restart").disabled=false;
            document.getElementById("back").disabled = true;
            winner=false;

        } else if(randa!=1 && score!=goal) {
            wronggoal.play();
            score-=1;
            document.getElementById("counter").innerHTML=score;
        }
        if (score==goal){
            document.getElementById("counter").innerHTML="goal reached";
            document.getElementById("Restart").style.background="rgb(9, 209, 101)";
            document.getElementById("Restart").disabled=false;
            document.getElementById("back").disabled = true;
        }
        randq = Math.floor(Math.random()*question.length);
        randa = Math.floor(Math.random()*2);
        generate()
        
        
        rotationspeed=0.001;
        enemyplayer.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);


    }
    
    
    
    enemyplayer.x += enemyplayer.acceleration.x * delta;
    enemyplayer.y += enemyplayer.acceleration.y * delta;

    player.x += player.acceleration.x * delta;
    player.y += player.acceleration.y * delta;
});

