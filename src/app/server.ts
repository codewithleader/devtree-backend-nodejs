import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/ecommerce', (req, res) => {
  res.send('From E-Commerce');
});

server.get('/hello', (req, res) => {
  res.send('From Hello');
});

export default server;
