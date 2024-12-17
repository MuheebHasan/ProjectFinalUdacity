const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8081;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// Placeholder data
const projectData = {
  city: '',
  country: '',
  weather: '',
  imageURL: '',
};

app.get('/data', (req, res) => {
  res.send(projectData);
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
