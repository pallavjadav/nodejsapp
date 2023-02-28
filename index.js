// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a new Express app
const app = express();

// Configure app middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect('mongodb+srv://sapbtpuser:0oLjjgGniuwz5K91@sapbtp-dev-cluster.fypxk.mongodb.net/PasswordGenerator?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for user data
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Define a model for user data
const User = mongoose.model('User', userSchema);

app.use("/", express.static("webapp/"));
//
app.get('/', async (req, res) => {
    
    res.send('Welcome to my nodejs app');
  });

// Define API routes for user registration and login
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send('User registered successfully');
});

app.post('/login', async (req, res) => {
    console.log(req.body)
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(`user ${user.username}`)
  if (!user) {
    res.send('User not found');
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.send('Invalid username or password');
    return;
  }
  res.status(200).send('User logged in successfully');
});

// Start the app
app.listen(8080, () => {
  console.log('Server running on port 8080');
});
