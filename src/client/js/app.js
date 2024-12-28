export const performAction = async () => {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  try {
    // إرسال اسم المدينة إلى الخادم فقط
    const response = await fetch('/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    });

    const data = await response.json();

    // عرض البيانات
    console.log(data);
    alert('Data fetched and displayed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};
