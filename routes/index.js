const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

module.exports = router;
