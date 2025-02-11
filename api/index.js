const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const dbPath = path.join(__dirname, "user.db");
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// Ensure table exists
db.run(
    `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY, 
        email TEXT, 
        password TEXT, 
        xp INTEGER, 
        questions TEXT, 
        answers TEXT, 
        avatar TEXT
    )`
);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Default route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Routes
app.get("/user", (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
});

app.post('/user-create', (req, res) => {
    const { email, password } = req.body;
    sql = 'INSERT INTO users (email, password, xp, questions, answers, avatar) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [email, password, 0, JSON.stringify([]), JSON.stringify([]), "https://pixijs.com/assets/bunny.png"], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User created successfully" });
    });
});

app.post('/user/add-question', (req, res) => {
    const { email, questions, answers } = req.body;
    const sqlSelect = `SELECT questions, answers FROM users WHERE email = ?`;

    db.get(sqlSelect, [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'User not found' });

        let currentQuestions = JSON.parse(row.questions || '[]');
        let currentAnswers = JSON.parse(row.answers || '[]');

        currentQuestions = currentQuestions.concat(JSON.parse(questions));
        currentAnswers = currentAnswers.concat(JSON.parse(answers));

        const sqlUpdate = `UPDATE users SET questions = ?, answers = ? WHERE email = ?`;
        db.run(sqlUpdate, [JSON.stringify(currentQuestions), JSON.stringify(currentAnswers), email], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Questions added successfully' });
        });
    });
});

app.post('/user/remove-question', (req, res) => {
    const { email } = req.body;
    sql = "UPDATE users SET questions = ?, answers = ? WHERE email = ?";
    db.run(sql, [JSON.stringify([]), JSON.stringify([]), email], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Questions removed successfully' });
    });
});

app.post('/user/add-xp', (req, res) => {
    const { email, xp } = req.body;
    const selectSQL = "SELECT xp FROM users WHERE email = ?";

    db.get(selectSQL, [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'User not found' });

        const updatedXP = row.xp + xp;
        const updateSQL = "UPDATE users SET xp = ? WHERE email = ?";

        db.run(updateSQL, [updatedXP, email], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'XP added successfully' });
        });
    });
});

app.post('/user/change-avatar', (req, res) => {
    const { email, avatar } = req.body;
    sql = "UPDATE users SET avatar = ? WHERE email = ?";
    db.run(sql, [avatar, email], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Avatar changed successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
