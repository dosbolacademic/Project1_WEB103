const express = require('express');
const path = require('path');
const data = require('./data.json'); // Hardcoded data

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Detail view route
app.get('/bosses/:id', (req, res) => {
  const boss = data.bosses.find(b => b.id === req.params.id);
  if (!boss) {
    return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
  // Dynamically generate detail page
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${boss.title} - Details</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <main class="container">
        <h1>${boss.title}</h1>
        <img src="${boss.image}" alt="${boss.title}" style="max-width: 300px;">
        <p><strong>Description:</strong> ${boss.description}</p>
        <p><strong>Location:</strong> ${boss.location}</p>
        <p><strong>Difficulty:</strong> ${boss.difficulty}</p>
        <a href="/">Back to List</a>
      </main>
    </body>
    </html>
  `);
});

// 404 route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});