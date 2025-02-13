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
  const filePath = path.join(__dirname, 'passwords.json');

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
  // Here we can pass the IP, but it’s optional since we are no longer using it for the password
  savePasswordToFile(req.ip, password);

  // Send the password to the client (you could also email it to yourself or store elsewhere)
  res.json({ password: password });
});

// Endpoint to validate the password
app.post('/validate-password', (req, res) => {
  const { ip, password } = req.body;

  const filePath = path.join(__dirname, 'passwords.json');
  if (fs.existsSync(filePath)) {
    const passwords = JSON.parse(fs.readFileSync(filePath));
    const userPassword = passwords.find(p => p.ip === ip);

    if (userPassword && userPassword.password === password) {
      return res.json({ success: true });
    }
  }

  res.json({ success: false, message: 'Incorrect password.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
