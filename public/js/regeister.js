

function register(){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/); 
    const isEmailValid = emailRegex.test(document.getElementById("Email").value);
    if (!isEmailValid) {
        alert("Invalid email provided. Please try again using a valid email...");
        return;
    } else if(document.getElementById("Password").value.length<4 || document.getElementById("Password").value!=document.getElementById("Password2").value ){
        alert("Please check Password");
        return;
    } else {
        const request = new XMLHttpRequest();
        request.open("GET", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user");
    
        request.onload = function() {
            if (request.status == 200) {
                const response = JSON.parse(request.responseText);
                const user = response;
                for (let i=0; i<user.length; i++){
                    if (user[i].email===document.getElementById("Email").value){
                         alert("User already exist");
                         localStorage.setItem("checkuser",JSON.stringify("!checked"))
                         break;
                    } else{
                        localStorage.setItem("checkuser",JSON.stringify("checked"))
                    }
    
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
    if(JSON.parse(localStorage.getItem("checkuser"))==="checked"){
        var data = {
            "email": document.getElementById("Email").value,
            "password":document.getElementById("Password").value,
        } 
        const request = new XMLHttpRequest();
        request.open("POST", "https://tashrif-radin-ali-cse-bachelor-thesis.onrender.com/user-create");
    
        request.setRequestHeader("Access-Control-Allow-Credentials", "true");
        request.setRequestHeader("Content-Type", "application/json");
    
    
        request.send(JSON.stringify(data));
        window.location="index.html";

    }
       
    }
       
    function back(){
        window.location="index.html";
    }

    

   


