function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com/'
    const forecastDiv = $('#forecast')
    const weatherIcons = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;'
    }

    function request(extension) {
        return $.ajax({
            method: 'GET',
            url: baseUrl + extension
        })
    }

    $('#submit').on('click', getForecast)

    function getForecast() {
        request('locations.json')
            .then(forecastInfo)
            .catch(handleError)

        function forecastInfo(locations) {
            let location = $('#location').val();
            let code = locations.filter(l => l.name === location)
                .map(l => l.code)[0];

            let todayForecastRequest = request(`forecast/today/${code}.json`)
            let upcomingForecastRequest = request(`forecast/upcoming/${code}.json`)
            Promise.all([todayForecastRequest, upcomingForecastRequest])
                .then(displayForecast)
                .catch(handleError)

            function displayForecast([todayForecast, upcomingForecast]) {
                forecastDiv.css('display', 'block')
                displayCurrentForecast(todayForecast)
                displayUpcomingForecast(upcomingForecast)
            }
        }

        function displayCurrentForecast(todayForecast) {
            let location = todayForecast.name;
            let condition = todayForecast.forecast.condition;
            let high = todayForecast.forecast.high;
            let low = todayForecast.forecast.low;
            let current = $('#current');
            current.empty();
            current
                .append($('<div class="label">Current conditions</div>'))
                .append($(`<span class="condition symbol">${weatherIcons[condition]}</span>`))
                .append($('<span class="condition"></span>')
                    .append($(`<span class="forecast-data">${location}</span>`))
                    .append($(`<span class="forecast-data">${low}&#176;/${high}&#176;</span>`))
                    .append($(`<span class="forecast-data">${condition}</span>`)));
        }


        function displayUpcomingForecast(upcomingForecast) {
            let upcoming = $('#upcoming');
            upcoming.empty();
            upcoming.append($('<div class="label">Three-day forecast</div>'))

            for (const forecast of upcomingForecast.forecast) {
                let condition = forecast.condition;
                let high = forecast.high;
                let low = forecast.low;
                upcoming
                    .append($('<span class="upcoming"></span>')
                        .append($(`<span class="symbol">${weatherIcons[condition]}</span>`))
                        .append($(`<span class="forecast-data">${low}&#176;/${high}&#176;</span>`))
                        .append($(`<span class="forecast-data">${condition}</span>`)));
            }
        }
    }

    function handleError() {
        forecastDiv.css('display', 'block');
        forecastDiv.text('Error')
    }
}