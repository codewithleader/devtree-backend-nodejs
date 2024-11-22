import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ecommerce', (req, res) => {
  res.send('From E-Commerce');
});

app.get('/hello', (req, res) => {
  res.send('From Hello');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
