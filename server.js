const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;
const APP_NAME = process.env.APP_NAME || 'Enterprise NodeJS App';
const SECRET = process.env.DEMO_SECRET || 'No Secret Found';

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: `Welcome to ${APP_NAME}`,
        status: 'Running Successfully'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date()
    });
});

app.get('/add', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    res.json({
        result: a + b
    });
});

app.get('/secret-check', (req, res) => {
    res.json({
        secretLoaded: SECRET ? 'YES' : 'NO'
    });
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} running on port ${PORT}`);
});