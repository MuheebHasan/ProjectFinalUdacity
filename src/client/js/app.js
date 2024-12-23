export const performAction = async () => {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  // Fetch data from APIs
  const geonamesUrl = `https://api.geonames.org/searchJSON?q=${city}&username=demo`;
  const weatherUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=YOUR_WEATHERBIT_API_KEY`;
  const pixabayUrl = `https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=${city}&image_type=photo`;

  try {
    const geonamesResponse = await fetch(geonamesUrl);
    const weatherResponse = await fetch(weatherUrl);
    const pixabayResponse = await fetch(pixabayUrl);

    const geonamesData = await geonamesResponse.json();
    const weatherData = await weatherResponse.json();
    const pixabayData = await pixabayResponse.json();

    const newEntry = {
      city: geonamesData.geonames[0]?.name || 'Unknown',
      country: geonamesData.geonames[0]?.countryName || 'Unknown',
      weather: weatherData.data[0]?.weather.description || 'Unknown',
      imageURL: pixabayData.hits[0]?.webformatURL || '',
    };

    // Post data to the server
    await fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    alert('Data fetched and stored successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};