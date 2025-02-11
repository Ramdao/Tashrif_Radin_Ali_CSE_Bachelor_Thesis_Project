
var flag = false;
var sec =0;
var min =0;
function timer(){
    document.getElementById("counter").style.color="rgb(9, 209, 101)";

    document.getElementById("counter").innerHTML=min+" "+"Min "+ sec +" "+"Sec";
    sec++;
    if (sec==60){
        sec=0;
        min+=1;
        document.getElementById("counter").innerHTML=min+" "+"Min "+ sec +" "+"Sec";
    }

}

function stop(){
    if (!flag){
        document.getElementById("stopbtn").innerHTML="Stop"
        timerc=setInterval(timer, 1000);
        flag=true;
    } else{
        document.getElementById("stopbtn").innerHTML="Resume"
        clearInterval(timerc);
        flag=false;

    }
    
    
}

function restart(){
    document.getElementById("stopbtn").innerHTML="Start"
    flag = false;
    sec =0;
    min =0;
    clearInterval(timerc);
    document.getElementById("counter").innerHTML=min+" "+"Min "+ sec +" "+"Sec";
}

function back(){
    window.location="Playarea.html";
}