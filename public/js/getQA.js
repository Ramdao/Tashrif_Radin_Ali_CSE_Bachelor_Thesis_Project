
q=[]
a=[]

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

question=JSON.parse(localStorage.getItem("question"))
answer=JSON.parse(localStorage.getItem("answer"))


question = question.replace(/\\/g, '');
answer = answer.replace(/\\/g, '');

question=JSON.parse(question)
answer=JSON.parse(answer)

document.getElementById("btn2").disabled =true;

if (question.length >=2){
    document.getElementById("btn2").disabled =false;

}




function next(){
    if(document.getElementById("Question").value!="" && document.getElementById("Answer").value!=""){
        q.push(document.getElementById("Question").value)
        a.push (document.getElementById("Answer").value)
       
    }
    
    document.getElementById("Question").value=""
    document.getElementById("Answer").value=""
   
}

function submit(){
    
    var data = {
        "email":JSON.parse(localStorage.getItem("user")),
        "questions":JSON.stringify(q) ,
        "answers":JSON.stringify(a),
    } 
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/user/add-question");

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");


    request.send(JSON.stringify(data));


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

question=JSON.parse(localStorage.getItem("question"))
answer=JSON.parse(localStorage.getItem("answer"))


question = question.replace(/\\/g, '');
answer = answer.replace(/\\/g, '');

question=JSON.parse(question)
answer=JSON.parse(answer)

if (question.length >=2){
    document.getElementById("btn2").disabled =false;

}

    
    
}

function clearQ(){
    count=0
    var data = {
        "email":JSON.parse(localStorage.getItem("user")),
    } 
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/user/remove-question");

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");


    request.send(JSON.stringify(data));
    
    
   
}

function howto(){
    window.location="Howto.html";
}


function game2(){
    window.location="Playarea.html";
}

function back(){
    window.location="index.html";
}
