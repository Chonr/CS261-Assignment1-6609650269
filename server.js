const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/hello', (req, res) => {
    const { myName, lastName } = req.query; // Get query parameters
    res.send(`Hello ${myName} ${lastName}`); // Return greeting message
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
