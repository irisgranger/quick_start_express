import express from 'express';
import db from './db.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test PostgreSQL connection
db.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, Express with PostgreSQL!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
