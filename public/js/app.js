const getBTN = document.querySelector('.get-btn');
const postBTN = document.querySelector('.post-btn');
const search = document.querySelector('.location');

getBTN.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.weather_result').textContent = 'Processing...';
    fetch(`/weather?location=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return document.querySelector('.weather_result').innerHTML = `Error: &nbsp${data.error}`;
            }
            document.querySelector('.weather_result').innerHTML = `Location: &nbsp${data.location}<br><br>
            Forecast: &nbsp${data.description}<br><br>
            Current Temperature: &nbsp${data.currentTemp}&nbsp°C<br><br>
            UV index: &nbsp${data.uvindex}<br><br>
            Humidity: &nbsp${data.humidity}%<br><br>
            Wind Speed: &nbsp${data.wind}&nbsp km/h`;
        }).catch((err) => {
            document.querySelector('.weather_result').textContent = 'Unexpected internal error, please try again.';
            console.log(err);
        });
    }).catch((err) => {
        document.querySelector('.weather_result').textContent = 'Connection to the server is lost, please try again.';
        console.log(err);
    });
});

postBTN.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.weather_result').textContent = 'Processing...';
    const data = {
        location: search.value
    };
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return document.querySelector('.weather_result').innerHTML = `Error: &nbsp${data.error}`;
            }
            document.querySelector('.weather_result').innerHTML = `Location: &nbsp${data.location}<br><br>
            Forecast: &nbsp${data.description}<br><br>
            Current Temperature: &nbsp${data.currentTemp}&nbsp°C<br><br>
            UV index: &nbsp${data.uvindex}<br><br>
            Humidity: &nbsp${data.humidity}%<br><br>
            Wind Speed: &nbsp${data.wind}&nbsp km/h`;
        }).catch((err) => {
            document.querySelector('.weather_result').textContent = 'Unexpected internal error, please try again.';
            console.log(err);
        });
    }).catch((err) => {
        document.querySelector('.weather_result').textContent = 'Connection to the server is lost, please try again.';
        console.log(err);
    });
});