const express = require('express');
const app = express();
const port = 3010;

app.get('/', (req, res) => {
  res.send('Hello my server on express')
});

app.listen(port, ()=> {
  console.log('listening on port', port);
});
