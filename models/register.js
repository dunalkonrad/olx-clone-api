const express = require('express');
const router = express.Router();
const saltRounds = 10;

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

router.post('/postgresql', (req, res) => {
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
