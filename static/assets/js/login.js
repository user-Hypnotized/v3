// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.static('public')); // For serving static files like HTML, CSS, JS

// // Hardcoded password for validation
// const correctPassword = 'duontop';

// // Login endpoint to verify the password
// app.post('/login', (req, res) => {
//   const password = req.body.password;
//   if (password === correctPassword) {
//     res.json({ success: true, message: 'Password correct' });
//   } else {
//     res.json({ success: false, message: 'Incorrect password' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
