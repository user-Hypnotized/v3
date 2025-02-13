const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // For serving static files like HTML, CSS, JS

// Utility to generate a random password with 5 letters and 5 numbers
function generatePassword() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  
  let password = '';
  
  // Generate 5 random letters
  for (let i = 0; i < 5; i++) {
    password += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 5 random numbers
  for (let i = 0; i < 5; i++) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return password;
}

// Function to save password to a file with an associated IP address or identifier (optional)
function savePasswordToFile(ip, password) {
  const passwordData = { ip, password };
  
  // Path to store the passwords
  const filePath = path.join(__dirname, 'static', 'assets', 'js', 'passwords.json');

  let passwords = [];
  if (fs.existsSync(filePath)) {
    passwords = JSON.parse(fs.readFileSync(filePath));
  }

  passwords.push(passwordData);
  fs.writeFileSync(filePath, JSON.stringify(passwords, null, 2));
}

// Endpoint to generate password and store it
app.get('/generate-password', (req, res) => {
  const password = generatePassword();

  // Save the generated password associated with the user's IP (optional)
  savePasswordToFile(req.ip, password);

  // Send the password to the client as a response
  res.json({ password: password });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
