(() => {
    const getBTN = document.querySelector('.get-btn');
    const postBTN = document.querySelector('.post-btn');
    const search = document.getElementById('location');
    const result = document.querySelector('.weather_result');

    getBTN.addEventListener('click', async (e) => {
        e.preventDefault();
        result.textContent = 'Processing...';
        try {
            let res = await fetch(`/weather?location=${search.value}`);
            try {
                let data = await res.json();
                if (data.error) {
                    return result.innerHTML = `Error: &nbsp${data.error}`;
                } else {
                    result.innerHTML = `Location: &nbsp${data.location}<br><br>
                Forecast: &nbsp${data.description}<br><br>
                Current Temperature: &nbsp${data.currentTemp}&nbsp°C<br><br>
                UV index: &nbsp${data.uvindex}<br><br>
                Humidity: &nbsp${data.humidity}%<br><br>
                Wind Speed: &nbsp${data.wind}&nbsp km/h`;
                }
            } catch (err) {
                result.textContent = 'Unexpected internal error, please try again.';
                console.log(err);
            }
        } catch (err) {
            result.textContent = 'Connection to the server is lost, please try again.';
            console.log(err);
        }
    });

    postBTN.addEventListener('click', async (e) => {
        e.preventDefault();
        result.textContent = 'Processing...';
        const data = {
            location: search.value
        };
        try {
            let res = await fetch('/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            try {
                let data = await res.json();
                if (data.error) {
                    return result.innerHTML = `Error: &nbsp${data.error}`;
                } else {
                    result.innerHTML = `Location: &nbsp${data.location}<br><br>
                Forecast: &nbsp${data.description}<br><br>
                Current Temperature: &nbsp${data.currentTemp}&nbsp°C<br><br>
                UV index: &nbsp${data.uvindex}<br><br>
                Humidity: &nbsp${data.humidity}%<br><br>
                Wind Speed: &nbsp${data.wind}&nbsp km/h`;
                }
            } catch (err) {
                result.textContent = 'Unexpected internal error, please try again.';
                console.log(err);
            }
        } catch (err) {
            result.textContent = 'Connection to the server is lost, please try again.';
            console.log(err);
        }
    });
})();