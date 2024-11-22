const express = require('express');

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

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
