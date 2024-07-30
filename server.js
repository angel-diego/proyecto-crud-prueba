const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si es necesario
    password: 'root', // Cambia esto si es necesario
    database: 'mycrud',
    port: '3306'
});

db.connect(err => {
    if (err) {
        console.log("error al conectarse con el contenedor");
        throw err;
        
    }
    console.log('Conectado a la base de datos');
});

// Configura el middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configura las rutas

// Mostrar formulario y lista de usuarios
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(`
            <html>
            <head><title>CRUD App</title></head>
            <body>
                <h1>CRUD Application</h1>
                <form action="/users" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <button type="submit">Add User</button>
                </form>
                <h2>Users</h2>
                <ul>
                    ${results.map(user => `
                        <li>
                            ${user.name} (${user.email})
                            <a href="/users/edit/${user.id}">Edit</a>
                            <a href="/users/delete/${user.id}">Delete</a>
                        </li>
                    `).join('')}
                </ul>
            </body>
            </html>
        `);
    });
});

// Crear usuario
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Editar usuario
app.get('/users/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            res.send('User not found');
            return;
        }
        const user = results[0];
        res.send(`
            <html>
            <head><title>Edit User</title></head>
            <body>
                <h1>Edit User</h1>
                <form action="/users/update/${user.id}" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="${user.name}" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${user.email}" required>
                    <button type="submit">Update User</button>
                </form>
                <a href="/">Back to list</a>
            </body>
            </html>
        `);
    });
});

app.post('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Eliminar usuario
app.get('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
