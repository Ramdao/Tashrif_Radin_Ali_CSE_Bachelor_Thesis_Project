
var notification = new Audio("Assests\\sounds\\happy-pop-3-185288.mp3")
notification.play();
document.getElementById("Change2").disabled=true;
document.getElementById("Change3").disabled=true;

window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

let avatar="https://pixijs.com/assets/bunny.png";

const request = new XMLHttpRequest();
request.open("GET", "http://localhost:5000/user");

request.onload = function() {
    if (request.status == 200) {
        const response = JSON.parse(request.responseText);
        let searchuser = JSON.parse(localStorage.getItem("user"))
        var user = response[0];

        for (let i=0; i<user.length; i++){
            if (user[i].email==searchuser){
               user=response[i]

            }
        }
        localStorage.setItem("avatar",JSON.stringify(user.avatar))
        localStorage.setItem("xp",JSON.stringify(user.xp))
       
    } else {
        console.error("Request failed with status:", request.status);
    }
};

request.onerror = function() {
    console.error("Network error occurred");
};

request.send();
xp=JSON.parse(localStorage.getItem("xp"))
avatar=JSON.parse(localStorage.getItem("avatar"))

document.getElementById("counter").innerHTML=document.getElementById("counter").innerHTML+" "+xp

if(xp>=5){
    document.getElementById("Change2").disabled=false;
}
if(xp>=10){
    document.getElementById("Change3").disabled=false;
}


const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

var url=avatar
const texture = PIXI.Texture.from(url);

//player
const player = new PIXI.Sprite(texture);
player.width=45;
player.height=60;
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





const movementSpeed = 0.1;



function distanceBetweenTwoPoints(p1, p2)
{
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}



app.ticker.add((delta) =>
{
    // Applied deacceleration for both squares, done by reducing the
    // acceleration by 0.01% of the acceleration every loop
    player.acceleration.set(player.acceleration.x * 0.99, player.acceleration.y * 0.99);
    

    
    if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0)
    {
        
        const redSquareCenterPosition = new PIXI.Point(
            player.x + (player.width * 0.5),
            player.y + (player.height * 0.5),
        );

        const toMouseDirection = new PIXI.Point(
            mouseCoords.x - redSquareCenterPosition.x,
            mouseCoords.y - redSquareCenterPosition.y,
        );

     
        const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x,
        );

       
        const distMouseRedSquare = distanceBetweenTwoPoints(
            mouseCoords,
            redSquareCenterPosition,
        );
        const redSpeed = distMouseRedSquare * movementSpeed;

        // Calculate the acceleration of the red square
        player.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed,
        );
    }

   

    

    player.x += player.acceleration.x * delta;
    player.y += player.acceleration.y * delta;
});

function change(){
    notification.play();
    var data = {
        "email":JSON.parse(localStorage.getItem("user")),
        "avatar":"https://pixijs.com/assets/bunny.png"
    } 
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/user/change-avatar");

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");


    request.send(JSON.stringify(data));
    player.texture = PIXI.Texture.from("https://pixijs.com/assets/bunny.png");
    player.width=45;
    player.height=60;

}
function change2(){
    notification.play();
    var data = {
        "email":JSON.parse(localStorage.getItem("user")),
        "avatar":"https://pixijs.com/assets/flowerTop.png"
    } 
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/user/change-avatar");

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");


    request.send(JSON.stringify(data));
    player.texture = PIXI.Texture.from("https://pixijs.com/assets/flowerTop.png");
    player.width=45;
    player.height=60;

}
function change3(){
    notification.play();
    var data = {
        "email":JSON.parse(localStorage.getItem("user")),
        "avatar":'https://pixijs.com/assets/eggHead.png'
    } 
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/user/change-avatar");

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");


    request.send(JSON.stringify(data));
    player.texture = PIXI.Texture.from('https://pixijs.com/assets/eggHead.png');
    player.width=45;
    player.height=60;

}


function back(){
    localStorage.setItem("score",0);
    localStorage.setItem("friendscore",0);
    window.location="Question.html";
}