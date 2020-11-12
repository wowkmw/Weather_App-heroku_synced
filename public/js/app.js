console.log("js loaded...");

const weatherForm = document.querySelector('.weather_search');
const search = document.querySelector('.location');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.weather_result').textContent = 'Loading...';
    const location = search.value;

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return document.querySelector('.weather_result').innerHTML = `Error: &nbsp${data.error}`;
            }
            document.querySelector('.weather_result').innerHTML = `Location: &nbsp${data.location}<br><br>
            Forecast: &nbsp${data.description}<br><br>
            Current Temperature: &nbsp${data.currentTemp}`;
        });
    });
});