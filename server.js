const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;
const APP_NAME = process.env.APP_NAME || 'Reminder App';

const DATA_FILE = path.join(__dirname, 'data', 'reminders.json');

app.use(express.json());
app.use(express.static('public'));

function readReminders() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

function writeReminders(reminders) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reminders, null, 2));
}

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        app: APP_NAME,
        timestamp: new Date()
    });
});

app.get('/api/reminders', (req, res) => {
    const reminders = readReminders();
    res.json(reminders);
});

app.post('/api/reminders', (req, res) => {
    const { title, date } = req.body;

    const reminders = readReminders();

    const newReminder = {
        id: uuidv4(),
        title,
        date,
        createdAt: new Date()
    };

    reminders.push(newReminder);

    writeReminders(reminders);

    console.log(`Reminder Added: ${title}`);

    res.status(201).json(newReminder);
});

app.delete('/api/reminders/:id', (req, res) => {
    const reminders = readReminders();

    const updated = reminders.filter(r => r.id !== req.params.id);

    writeReminders(updated);

    console.log(`Reminder Deleted: ${req.params.id}`);

    res.json({
        message: 'Reminder deleted'
    });
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} running on port ${PORT}`);
});