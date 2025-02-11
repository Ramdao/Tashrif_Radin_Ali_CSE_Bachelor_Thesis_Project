window.onload = function() {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

document.getElementById("Restart").disabled = true;
var question = JSON.parse(localStorage.getItem("question")) || ["q1", "q2", "q3"];
var answer = JSON.parse(localStorage.getItem("answer")) || ["a1", "a2", "a3"];
var avatar = JSON.parse(localStorage.getItem("avatar")) || "https://pixijs.com/assets/bunny.png";
var winner = true;

var randq = Math.floor(Math.random() * question.length);
var randa = Math.floor(Math.random() * answer.length);
let bullets = [];
let basictexts = [];
let bulletspeed = 10;
var score = 0;
let textCounter = 0;
let textSpawnInterval = 200; // Adjust the interval as needed
goal = 5;
document.getElementById("question").innerHTML = question[randq];

const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });
document.querySelector("#Gamearea").appendChild(app.view);

app.stage.interactive = true;
document.querySelector("#Gamearea").addEventListener("pointerdown", fireBullet);

const container = new PIXI.Container();
app.stage.addChild(container);

let texture = PIXI.Texture.from(avatar);
const style = new PIXI.TextStyle({
    fill: ["red"],
});

const player = new PIXI.Sprite(texture);
player.anchor.set(0.5);
player.position.set(app.screen.width / 2, app.screen.height / 2);
player.width = 40;
player.height = 50;
container.addChild(player);

let keys = {};

function keydown(e) {
    keys[e.keyCode] = true;
}

function keyup(e) {
    keys[e.keyCode] = false;
}
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

function fireBullet(e) {
    let bullet = createBullet();
    bullet.vx = Math.sin(player.rotation) * bulletspeed;
    bullet.vy = -Math.cos(player.rotation) * bulletspeed;
    bullets.push(bullet);
    textCounter = 0; // Reset the counter after firing a bullet
}

function createBullet() {
    const bulletTexture = PIXI.Texture.from("Assests\\output-onlinepngtools.png");
    const bullet = new PIXI.Sprite(bulletTexture);
    bullet.width = 55;
    bullet.height = 50;
    bullet.anchor.set(0.5);
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.rotation = player.rotation;
    container.addChild(bullet);
    return bullet;
}

function createText() {
    const positionx = Math.random() * (app.screen.width - 100) + 100;
    const positiony = Math.random() * (app.screen.height - 100) + 100;
    const basicText = new PIXI.Text(answer[randa], style);
    basicText.position.set(positionx, positiony);
    container.addChild(basicText);
    basictexts.push(basicText);
}

function updateBullets(delta) {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.x += bullets[i].vx * delta;
        bullets[i].position.y += bullets[i].vy * delta;

        if (
            bullets[i].position.y < 0 ||
            bullets[i].position.x < 0 ||
            bullets[i].position.x > app.screen.width
        ) {
            bullets[i].dead = true;
        }

        for (let j = 0; j < basictexts.length; j++) {
            if (testForAABB(bullets[i], basictexts[j])) {
                if (answer.indexOf(basictexts[j].text) === question.indexOf(document.getElementById("question").innerHTML)) {
                    score += 1;
                } else {
                    score -= 1;
                }
                randq = Math.floor(Math.random() * question.length);
                document.getElementById("question").innerHTML = question[randq];
                document.getElementById("counter").innerHTML = score;
                container.removeChild(basictexts[j]);
                basictexts.splice(j, 1);
            }
        }
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].dead) {
            container.removeChild(bullets[i]);
            bullets.splice(i, 1);
        }
    }
}

function restart() {
    if (winner) {
        var data = {
            "email": JSON.parse(localStorage.getItem("user")),
            "xp": 5
        }
        const request = new XMLHttpRequest();
        request.open("POST", "http://localhost:5000/user/add-xp");

        request.setRequestHeader("Access-Control-Allow-Credentials", "true");
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(data));

        localStorage.setItem("score", parseInt(localStorage.getItem("score")) + 1)
    } else {
        localStorage.setItem("friendscore", parseInt(localStorage.getItem("friendscore")) + 1)
    }
    document.getElementById("back").disabled = false;
    score = 0;
    document.getElementById("counter").innerHTML = score;
    document.getElementById("restart").style.backgroundColor = "rgb(223, 90, 90)";
}

function back() {
    window.location = "Playarea.html";
}

app.ticker.add((delta) => {
    randa = Math.floor(Math.random() * answer.length);

    if (keys["65"]) {
        player.rotation -= 0.1;
    }

    if (keys["68"]) {
        player.rotation += 0.1;
    }

    textCounter++;

    if (textCounter % textSpawnInterval === 0) {
        createText();
    }

    if (basictexts.length > 0) {
        let indicesToRemove = [];

        for (let i = 0; i < basictexts.length; i++) {
            if (testForAABB(player, basictexts[i])) {
                indicesToRemove.push(i);
            }

            if (basictexts[i].x > player.x) {
                basictexts[i].x -= 1;
            }
            if (basictexts[i].x < player.x) {
                basictexts[i].x += 1;
            }
            if (basictexts[i].y < player.y) {
                basictexts[i].y += 1;
            }
            if (basictexts[i].y > player.y) {
                basictexts[i].y -= 1;
            }
        }

        // Remove elements marked for removal
        for (let i = indicesToRemove.length - 1; i >= 0; i--) {
            container.removeChild(basictexts[indicesToRemove[i]]);
            basictexts.splice(indicesToRemove[i], 1);
        }
    }

    updateBullets(delta);
    if (score >= goal) {
        textSpawnInterval = 0;
        document.getElementById("counter").innerHTML = "You Won!"
        document.getElementById("Restart").style.backgroundColor = "rgb(9, 209, 101)";
        document.getElementById("Restart").disabled = false;
        document.getElementById("back").disabled = true;

    } else if (score <= -3) {
        textSpawnInterval = 0;
        document.getElementById("counter").innerHTML = "Your friend Won!"
        document.getElementById("Restart").style.backgroundColor = "rgb(9, 209, 101)";
        document.getElementById("Restart").disabled = false;
        document.getElementById("back").disabled = true;
        winner = false;
    }

});
