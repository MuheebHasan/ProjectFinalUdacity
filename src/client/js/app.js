// Function to handle the action when the button is clicked
export const performAction = async () => {
  const city = document.getElementById('city').value;
  const date = document.getElementById('date').value;

  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  if (!date) {
    alert('Please select a date!');
    return;
  }

  try {
    // Send data to the server
    const response = await fetch('/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city, date }),
    });

    if (!response.ok) {
      alert(`Error fetching data: ${response.statusText}`);
      return;
    }

    const data = await response.json();

    if (!data || !data.city || !data.weather) {
      alert('No data found for the entered city!');
      return;
    }

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <p><strong>City:</strong> ${data.city}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Weather:</strong> ${data.weather}</p>
      <p><strong>Temperature:</strong> ${data.temperature}°C</p>
    `;
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
};

// Attach the performAction function to the button
document.getElementById('generate').addEventListener('click', performAction);
