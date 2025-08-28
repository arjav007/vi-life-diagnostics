import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Use PORT from environment variables or fallback to 3000
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
