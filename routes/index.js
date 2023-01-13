const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://admin:admin@host.docker.internal:5432/olx',
});

router.get("/", (req, res) => {
    res.send("APP running");
});

router.post('/register', (req, res) => {
    const { username, surname, hashedPassword, email, phone } = req.body;

    const query = 'INSERT INTO USERS (name, surname, password, email, phone ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [username, surname, hashedPassword, email, phone];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd tworzenia nowego użytkownika');
        }
        res.send(result.rows[0]);
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT email, password FROM USERS WHERE email = $1';
    const values = [email];

    try {
        const { rows } = await pool.query(query, values);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
        }
        const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: '1d' });
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Wystąpił błąd podczas próby logowania' });
    }
});

router.post('/add-advertisement', async (req, res) => {
    const { title, photo, description, price, email, phone } = req.body;

    const query = 'INSERT INTO ADVERTISEMENT (title, photo, description, price, email, phone ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [title, photo, description, price, email, phone];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd dodawania nowego ogłoszenia');
        }
        res.send(result.rows[0]);
    });
});


module.exports = router;