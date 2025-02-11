
q=[]
a=[]
var flag=localStorage.getItem("NoQ")
document.getElementById("btn2").disabled =true;
var count =0
if (flag==flag){
    document.getElementById("btn2").disabled =false; 
}
function next(){
    if(document.getElementById("Question").value!="" && document.getElementById("Answer").value!=""){
        q.push(document.getElementById("Question").value)
        a.push (document.getElementById("Answer").value)
        count++
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
    
    
    if (count>=2){
        document.getElementById("btn2").disabled =false; 
        localStorage.setItem("NoQ","submitted")
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

function profile(){
    window.location="Userprofile.html";
}


function game2(){
    window.location="Playarea.html";
}


