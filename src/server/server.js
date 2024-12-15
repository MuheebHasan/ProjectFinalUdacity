const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

const port = 8081;
app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
