const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>helloai codeing</title></head><body><h1>helloai codeing</h1></body></html>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
