
/*please install cors and sqlite 3*/

const sqlite3 = require('sqlite3').verbose();
let sql;
const db = new sqlite3.Database("C:\\Users\\radin\\Desktop\\thesis\\api\\user.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY,email TEXT,password TEXT,xp INTEGER,questions TEXT,answers TEXT,avatar TEXT)';
db.run(sql, [], (err) => {
    if (err) return console.error(err.message);
});
/*
sql = 'INSERT INTO users (email,password,xp,questions,answers,avatar) VALUES (?,?,?,?,?,?)';
db.run(sql, ["Radin2", "test", 0, JSON.stringify([]), JSON.stringify([]), "https://pixijs.com/assets/bunny.png"], (err) => {
    if (err) return console.error(err.message);
});
*/

sql = 'SELECT * FROM users';
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {

        console.log(row);
    });
});

/*
sql = "DELETE FROM users WHERE id == 3";
db.run(sql, [], (err) => {
    if (err) return console.error(err.message);
});

*/


var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json()); // Add this line for body parsing

const PORT = 5000;

app.listen(PORT, () => console.log("http://localhost:5000"));

app.get("/user", (req, res) => {

    // Query to select all data from the users table
    const sql = "SELECT * FROM users";

    // Execute the query
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Send the retrieved data as a response
        res.status(200).json(rows);
    });
    
    
});

app.post('/user-create', (req, res) => {
    const data = req.body;
    const email = data.email; 
    const password = data.password;
    sql = 'INSERT INTO users (email,password,xp,questions,answers,avatar) VALUES (?,?,?,?,?,?)';
    db.run(sql, [email, password, 0, JSON.stringify([]), JSON.stringify([]), "https://pixijs.com/assets/bunny.png"], (err) => {
    if (err) return console.error(err.message);
    });

});

app.post('/user/add-question', (req, res) => {
    const data = req.body;
    const email = data.email;
    let newQuestions = JSON.parse(data.questions);
    let newAnswers = JSON.parse(data.answers);

    // Fetch current questions and answers from the database
    const sqlSelect = `SELECT questions, answers FROM users WHERE email = ?`;

    db.get(sqlSelect, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        let currentQuestions = JSON.parse(row.questions || '[]');
        let currentAnswers = JSON.parse(row.answers || '[]');

        // Merge new questions and answers with the current ones
        currentQuestions = currentQuestions.concat(newQuestions);
        currentAnswers = currentAnswers.concat(newAnswers);

        // Construct the SQL UPDATE query
        const sqlUpdate = `UPDATE users SET questions = ?, answers = ? WHERE email = ?`;

        // Execute the UPDATE query
        db.run(sqlUpdate, [JSON.stringify(currentQuestions), JSON.stringify(currentAnswers), email], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Check if any rows were affected by the update
            if (this.changes === 0) {
                // If no rows were affected, it means the user with the specified email was not found
                return res.status(404).json({ error: 'User not found' });
            }

            // If the update was successful, send a success message
            res.status(200).json({ message: 'Questions added successfully' });
        });
    });
});

app.post('/user/remove-question', (req, res) => {
    const data = req.body;
    const email = data.email; 
    sql = "UPDATE users SET questions = ? , answers = ? WHERE email = ? ";
    db.run(sql, [JSON.stringify([]), JSON.stringify([]), email], (err) => {
    if (err) return console.error(err.message);
});
    
    res.status(200).send({ message: ' removed successfully' });
});

app.post('/user/add-xp', (req, res) => {
    const data = req.body;
    const email = data.email;
    const xpToAdd = data.xp; // XP to be added

    // Query to fetch the current XP value
    const selectSQL = "SELECT xp FROM users WHERE email = ?";
    
    // Execute the SELECT query to get the current XP value
    db.get(selectSQL, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Current XP value retrieved from the database
        const currentXP = row.xp;

        // Calculate the updated XP value
        const updatedXP = currentXP + xpToAdd;

        // Query to update the XP value
        const updateSQL = "UPDATE users SET xp = ? WHERE email = ?";

        // Execute the UPDATE query to update the XP value in the database
        db.run(updateSQL, [updatedXP, email], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).send({ message: 'XP added successfully' });
        });
    });
});

app.post('/user/change-avatar', (req, res) => {
    const data = req.body;
    const email = data.email;
    const avatar =data.avatar ;
    sql = "UPDATE users SET avatar= ? WHERE email = ? ";
    db.run(sql, [avatar, email], (err) => {
    if (err) return console.error(err.message);
});
    
    res.status(200).send({ message: 'avatar changed' });
});



