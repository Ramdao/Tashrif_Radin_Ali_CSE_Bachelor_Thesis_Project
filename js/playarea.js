

window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

document.getElementById("profile").disabled =true

var score= parseInt(localStorage.getItem("score"));
var friendscore = localStorage.getItem("friendscore");


document.getElementById("playerscore").innerHTML = score
document.getElementById("friendscore").innerHTML = friendscore;


document.getElementById("restart").disabled=true;

if( score >= 3){
    document.getElementById("profile").disabled = false;
    
} if (friendscore >=3){
    document.getElementById("restart").disabled = false;
    document.getElementById("football").disabled =true;
    document.getElementById("card").disabled =true;
    document.getElementById("throw").disabled =true;
    document.getElementById("stopwatch").disabled =true;
    document.getElementById("catch").disabled =true;
}

function restart(){
    localStorage.setItem("score",0);
    localStorage.setItem("friendscore",0);
    score= parseInt(localStorage.getItem("score"));
    friendscore = localStorage.getItem("friendscore");
    document.getElementById("playerscore").innerHTML = score
    document.getElementById("friendscore").innerHTML = friendscore;
    document.getElementById("restart").disabled=true;
    document.getElementById("card").disabled =false;
    document.getElementById("football").disabled =false;
    document.getElementById("throw").disabled =false;
    document.getElementById("stopwatch").disabled =false;
    document.getElementById("catch").disabled =false;
       
}


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

const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });
document.getElementById("playarea").appendChild(document.getElementById("playarea2"))
document.getElementById("playarea2").appendChild(app.view);
const container = new PIXI.Container();
app.stage.addChild(container);


var texture = PIXI.Texture.from("https://pixijs.com/assets/bunny.png"); //player
avatar=JSON.parse(localStorage.getItem("avatar"))
texture = PIXI.Texture.from(avatar); //player

const texture2 = PIXI.Texture.from("Assests\\post.png") ;//game1
const texture3 = PIXI.Texture.from("https://pixijs.com/assets/bunny.png"); //friend
const texture5 = PIXI.Texture.from("Assests\\output-onlinepngtools.png");
const texture4 =  PIXI.Texture.from("Assests\\playing-cards-set-with-pixel-art-style_475147-664.avif");
const texture6 = PIXI.Texture.from("Assests\\pixel-art-stopwatch-vector-icon-8bit-game-white-background_360488-522.avif");
const texture7 = PIXI.Texture.from("Assests\\Screenshot 2024-05-03 113625.png");
//game1
const game1 = new PIXI.Sprite(texture2);
game1.width=200;
game1.height=250;
game1.position.set(300,200);

//game2
const game2 = new PIXI.Sprite(texture4);
game2.width=200;
game2.height=200;
game2.position.set(550,240);

//game3
const game3 = new PIXI.Sprite(texture5);
game3.width=200;
game3.height=200;
game3.position.set(800,240);

// game 4
const game4 = new PIXI.Sprite(texture6);
game4.width=200;
game4.height=200;
game4.position.set(1050,240);

// game 5
const game5 = new PIXI.Sprite(texture7);
game5.width=200;
game5.height=200;
game5.position.set(1350,240);

//player
const player = new PIXI.Sprite(texture);
player.width=40;
player.height=50;
player.anchor.set(0.5)

player.position.set(100,200);
player.acceleration = new PIXI.Point(0);
player.mass = 1;

//friend
const player2 = new PIXI.Sprite(texture3);
player2.width=40;
player2.height=50;
player2.anchor.set(0.5)

player2.position.set(100,200);
player2.acceleration = new PIXI.Point(0);
player2.mass = 1;

const mouseCoords = { x: 0, y: 0 };

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('mousemove', (event) =>
{
    mouseCoords.x = event.global.x;
    mouseCoords.y = event.global.y;
});

container.addChild(player,player2,game1,game2,game3,game4,game5);

const movementSpeed = 0.05;
const impulsePower = 5;
const behindplayer =40;
function distanceBetweenTwoPoints(p1, p2)
{
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

function football(){
    window.location="game1.html";
}

function card(){
    window.location="game3.html";
}

function shootball(){
    window.location="game5.html";
}

function stopwatch(){
    window.location="game4.html";
}

function back(){
    window.location="Question.html";
}

function catcH(){
    window.location = "game2.html";
}
function profile(){
    window.location="Userprofile.html";
}


app.ticker.add((delta) =>
{ 
    player.acceleration.set(player.acceleration.x * 0.99, player.acceleration.y * 0.99);
    player2.acceleration.set(player.acceleration.x * 0.99, player.acceleration.y * 0.99);
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
    player.x += player.acceleration.x * delta;
    player.y += player.acceleration.y * delta;

    if (player2.x>player.x - behindplayer){
        player2.x -=1.5
    }
    if (player2.x<player.x - behindplayer){
        player2.x +=1.5
    }
    if (player2.y>player.y - behindplayer){
        player2.y -=1.5
    }
    if (player2.y<player.y - behindplayer){
        player2.y +=1.5
    }
});

