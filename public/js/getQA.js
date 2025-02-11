let q = [];
let a = [];

function next() {
    if (document.getElementById("Question").value !== "" && document.getElementById("Answer").value !== "") {
        q.push(document.getElementById("Question").value);
        a.push(document.getElementById("Answer").value);
    }
    document.getElementById("Question").value = "";
    document.getElementById("Answer").value = "";
}

function submit() {
    // Manually setting the questions and answers to localStorage
    localStorage.setItem("question", JSON.stringify(q));
    localStorage.setItem("answer", JSON.stringify(a));

    // After storing, you can perform additional operations
    // For example, enabling the play button if you have at least 2 questions
    if (q.length >= 2) {
        document.getElementById("btn2").disabled = false;
    }
}

function clearQ() {
    // Clear localStorage or reset the arrays
    localStorage.removeItem("question");
    localStorage.removeItem("answer");
    q = [];
    a = [];
}

function howto() {
    window.location = "Howto.html";
}

function game2() {
    window.location = "Playarea.html";
}

function back() {
    window.location = "index.html";
}
