const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes'));
app.use('/api/upload', require('./routes/upload'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Seed data endpoint (for development)
app.post('/api/seed/hero', (req, res) => {
  const heroData = {
    title: "Let's Work Together to Create Wonders with Us",
    description: "A visionary educational consultancy, crafting captivating opportunities through expert guidance and personalized support. Adept at turning your study abroad dreams into extraordinary reality.",
    buttonText1: "Let's Talk.",
    buttonText2: "Select Courses", 
    buttonLink1: "/contact",
    buttonLink2: "/courses",
    images: [],
    isActive: true
  };

  // Simulate saving to storage
  if (!global.storage) global.storage = {};
  if (!global.storage.hero) global.storage.hero = [];
  
  // Clear existing heroes
  global.storage.hero = [];
  
  // Add new hero
  const newHero = {
    id: Date.now(),
    ...heroData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  global.storage.hero.push(newHero);
  
  res.json(newHero);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;