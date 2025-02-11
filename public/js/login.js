localStorage.clear();
localStorage.setItem("score",0);
localStorage.setItem("friendscore",0);

function login() {
    const request = new XMLHttpRequest();
    request.open("GET", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user");

    request.onload = function() {
        if (request.status == 200) {
            const response = JSON.parse(request.responseText);
            const user = response;

            let credentialsMatch = false;

            for (let i = 0; i < user.length; i++) {
                if (user[i].email == document.getElementById("Email").value && user[i].password == document.getElementById("Password").value) {
                    localStorage.setItem("user", JSON.stringify(user[i].email));
                    window.location = "Question.html";
                    credentialsMatch = true;
                    break;
                }
            }

            if (!credentialsMatch) {
                alert("Wrong Credientials");
            }
        } else {
            console.error("Request failed with status:", request.status);
        }
    };

    request.onerror = function() {
        console.error("Network error occurred");
    };

    request.send();
}


function register(){
   window.location="Register.html";

   
}

