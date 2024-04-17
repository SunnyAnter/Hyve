const express = require('express');
const cors = require('cors');
const router = require('./router');
const conf = require('./config');
const app = express();

app
  .use(cors())
  .use(express.json())
  .use(router)
  .listen(conf.port, () => {
    console.log(`Server running on http://localhost:${conf.port}`);
  });