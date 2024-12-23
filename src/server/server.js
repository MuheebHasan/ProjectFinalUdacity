const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

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

app.post('/add', (req, res) => {
  const { city, country, weather, imageURL } = req.body;
  projectData.city = city;
  projectData.country = country;
  projectData.weather = weather;
  projectData.imageURL = imageURL;
  res.send({ message: 'Data added successfully' });
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});