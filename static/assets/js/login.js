const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files

// Serve the main app without login
app.get('/', (req, res) => {
  res.redirect('/app'); // Redirect users to the main app automatically
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html')); // Load the main app
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
