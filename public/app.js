async function loadReminders() {
    const response = await fetch('/api/reminders');
    const reminders = await response.json();

    const list = document.getElementById('reminderList');

    list.innerHTML = '';

    reminders.forEach(reminder => {
        const li = document.createElement('li');

        li.innerHTML = `
            <strong>${reminder.title}</strong>
            - ${reminder.date}
            <button onclick="deleteReminder('${reminder.id}')">Delete</button>
        `;

        list.appendChild(li);
    });
}

async function addReminder() {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;

    await fetch('/api/reminders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, date })
    });

    loadReminders();
}

async function deleteReminder(id) {
    await fetch(`/api/reminders/${id}`, {
        method: 'DELETE'
    });

    loadReminders();
}

loadReminders();