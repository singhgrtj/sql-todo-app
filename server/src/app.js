const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd; 


// Create Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db-todo-list'
});


// Connect
db.connect((error) => {
    if (error) {
        console.log('Connection Error with MySQL');
        return;
    }
    console.log('MySQL Connected');
});


// Run server
const app = express();

app.listen('3001', () => {
    console.log('Server running on port 3001');
});

app.use(cors())
app.use(express.json())

// Set API
app.get('/todos', (req, res) => {
    let sql = `SELECT * FROM todos WHERE date = '${today}'`
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
    });
});

app.post('/', (req, res) => {
    let sql = `INSERT INTO todos(id, todo, date) VALUES ('${req.body.id}','${req.body.todo}', '${today}')`;
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        res.setHeader('Content-Type', 'application/json');
        res.send(req.body);
    });
})

app.delete('/todo/delete', (req, res) => {
    let sql = `DELETE FROM todos WHERE id = '${req.body.id}'`;
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        res.setHeader('Content-Type', 'application/json');
        res.send(req.body);
    })
})


