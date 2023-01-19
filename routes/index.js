const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {Pool} = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://admin:admin@host.docker.internal:5432/olx',
});

router.get("/", (req, res) => {
    res.send("APP running");
});

router.post('/register', (req, res) => {
    const {username, surname, hashedPassword, email, phone} = req.body;

    const query = 'INSERT INTO USERS (name, surname, password, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *';
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
    const {email, password} = req.body;

    const query = 'SELECT email, password FROM USERS WHERE email = $1';
    const values = [email];

    try {
        const {rows} = await pool.query(query, values);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: 'Nieprawidłowy email lub hasło'});
        }
        const token = jwt.sign({userId: user.id}, "secret", {expiresIn: '1d'});
        return res.json({token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Wystąpił błąd podczas próby logowania'});
    }
});

router.get('/get-city', (req, res) => {
    const query = 'SELECT name FROM city';

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Błąd pobrania miast');
        }
        res.status(200).json(result.rows);
    });
});

router.get('/get-province', (req, res) => {
    const query = 'SELECT name FROM province';

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Błąd pobrania województw');
        }
        res.status(200).json(result.rows);
    });
});

router.get('/get-category', (req, res) => {
    const query = 'SELECT name FROM category';

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Błąd pobrania kategorii');
        }
        res.status(200).json(result.rows);
    });
});

router.post('/add-advertisement', async (req, res) => {
    const {title, category, photo, description, city, province, email, username, phone, price} = req.body;

    const query = 'INSERT INTO ADVERTISEMENT (title, category, photo, description, city, province, email, username, phone, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const values = [title, category, photo, description, city, province, email, username, phone, price];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd dodawania nowego ogłoszenia');
        }
        res.send(result.rows[0]);
    });
});

router.get('/get-advertisement', (req, res) => {
    const query = 'SELECT * FROM ADVERTISEMENT';

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Błąd pobrania kategorii');
        }
        res.status(200).json(result.rows);
    });
});
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM USERS';

    pool.query(query, (error, result) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.get("/search", async (req, res) => {
    const { q, caseInsensitive } = req.query;
    let query;
    if (caseInsensitive) {
        query = `SELECT * FROM ADVERTISEMENT WHERE title ILIKE '%${q}%' OR description ILIKE '%${q}%'`;
    } else {
        query = `SELECT * FROM ADVERTISEMENT WHERE title LIKE '%${q}%' OR description LIKE '%${q}%'`;
    }
    const result = await pool.query(query);
    res.send(result.rows);
});

module.exports = router;
