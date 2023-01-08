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
    const { username, surname, password, email, phone } = req.body;

    const query = 'INSERT INTO USERS (name, surname, password, email, phone ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [username, surname, password, email, phone];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd tworzenia nowego użytkownika');
        }
        res.send(result.rows[0]);
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM USERS WHERE email = $1', [email])
        .then((result) => {
            const user = result.rows[0];
            if (!user) {
                return res.status(401).send('Nieprawidłowe dane logowania');
            }
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send('Nieprawidłowe dane logowania');
                    }
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: 86400,
                    });
                    return res.json({ token });
                });
        });
});

module.exports = router;
