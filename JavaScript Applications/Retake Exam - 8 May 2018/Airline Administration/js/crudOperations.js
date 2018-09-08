const appKey = 'kid_ryh8diYPm';
const appSecret = 'c4e375a816fc459b83268d1a596cd327';
const baseUrl = 'https://baas.kinvey.com/';
const basicAuth = {'Authorization': "Basic " + btoa(appKey + ":" + appSecret)}
const flightsUrl = baseUrl + 'appdata/' + appKey + '/flights';
const userUrl = baseUrl + 'user/' + appKey + '/'

function getKinveyAuth() {
    return {
        'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`
    }
}

function makeRequest(method, url, endpoint, auth, data) {
    return $.ajax({
        method: method,
        url: url + endpoint,
        headers: auth,
        data: data
    })
}

//LOGIN USER
function login() {
    let form = $('#formLogin')
    let username = form.find('input[name="username"]').val();
    let password = form.find('input[name="pass"]').val();
    if (username.length < 5) {
        showError('A username should be a string with at least 5 characters long. ')
    } else if (!username) {
        showError('Username is required!')
    } else if (!password) {
        showError('Password cannot be empty!')
    }else{
        let data = {username, password}
        makeRequest('POST', userUrl, 'login', basicAuth, data)
            .then(function (res) {
                signInUser(res, 'User login successfully.')
                $('#formLogin').trigger('reset')
            }).catch(handleAjaxError)
    }
}

//REGISTER USER
function register() {
    let form = $('#formRegister')
    let username = form.find('input[name="username"]').val();
    let password = form.find('input[name="pass"]').val();
    let repeatPassword = form.find('input[name="checkPass"]').val();
    if (username.length < 5) {
        showError('A username should be a string with at least 5 characters long. ')
    } else if (!username) {
        showError('Username is required!')
    } else if (!password) {
        showError('Password cannot be empty!')
    } else if (password !== repeatPassword) {
        showError('Passwords must match!')
    } else {
        let data = {username, password}
        makeRequest('POST', userUrl, '', basicAuth, data)
            .then(function (res) {
                signInUser(res, 'User registration successful.')
                $('#formRegister').trigger('reset')
            }).catch(handleAjaxError)
    }
}

//LOGOUT USER
function logout() {
    makeRequest("POST", userUrl, '_logout', getKinveyAuth())
        .then(function () {
            sessionStorage.clear()
            showInfo('Logout Successfully!')
            showHideMenuLinks()
            showRegisterView()
        }).catch(handleAjaxError)
}

//ADD FLIGHT
function addFlight() {
    let form = $('#formAddFlight')
    let destination = form.find('input[name="destination"]').val();
    let origin = form.find('input[name="origin"]').val();
    let departureDate = form.find('input[name="departureDate"]').val();
    let departureTime = form.find('input[name="departureTime"]').val();
    let cost = form.find('input[name="cost"]').val();
    let seats = form.find('input[name="seats"]').val();
    let img = form.find('input[name="img"]').val();
    let isPublic = form.find('input[type="checkbox"]').is(":checked")
    if (!destination) {
        showError('Destination is required!')
    } else if (!origin) {
        showError('Origin is required!')
    } else if (seats <= 0 || cost <= 0) {
        showError('Cost and seats must be positive numbers!')
    } else {
        let data = {destination, origin, departureDate, departureTime, seats, cost, img, isPublic}
        makeRequest('POST', flightsUrl, "", getKinveyAuth(), data)
            .then(function () {
                showInfo('Created flight.')
                showHomeView()
                $('#formAddFlight').trigger('reset')
            }).catch(handleAjaxError)
    }
}

//Show all public flights
function showAllPublicFlights() {
    makeRequest('GET', flightsUrl, '?query={"isPublic":"true"}', getKinveyAuth())
        .then(function (flights) {
            let mainDiv = $('#allFlights');
            mainDiv.empty()
            for (const flight of flights) {
                let aTag = $('<a href="#" class="added-flight"></a>')
                aTag.on('click', function () {
                    displayFlightDetails(flight._id)
                })
                aTag.append($(`<img src="${flight.img}" alt="" class="picture-added-flight">`))
                    .append($(`<h3>${flight.destination}</h3>`))
                    .append($(`<span>from ${flight.origin}</span><span>${flight.departureDate}</span>`))
                mainDiv.append(aTag)
            }
        }).catch(handleAjaxError)
}

//DISPLAY FLIGHT DETAIL
function displayFlightDetails(id) {
    makeRequest('GET', flightsUrl, '/' + id, getKinveyAuth())
        .then(function (flight) {
            let mainDiv = $('#viewFlightDetails').find('.ticket-area');
            mainDiv.empty()

            let imageDiv = $('<div class="ticket-area-left">')
                .append($(`<img src="${flight.img}" alt="">`))
            mainDiv.append(imageDiv)

            let flightDiv = $('<div class="ticket-area-right">')
            flightDiv.append($(`<h3>${flight.destination}</h3>`))
                .append(`<div>from ${flight.origin}</div>`)
            let timeDiv = $(`<div class="data-and-time">${flight.departureDate} ${flight.departureTime}</div>`)
            if (sessionStorage.getItem('userId') === flight._acl.creator) {
                let editLink = $('<a href="#" class="edit-flight-detail"></a>')
                editLink.on('click', function () {
                    loadFlightForEditting(flight)
                })
                timeDiv.append(editLink)
            }
            flightDiv.append(timeDiv)
            flightDiv.append($(`<div>${flight.seats} Seats (${flight.cost} per seat)</div>`))
            mainDiv.append(flightDiv)
        }).catch(handleAjaxError)
    viewFlightDetails()
}

//EDIT FLIGHT
function loadFlightForEditting(flight) {
    let form = $('#formEditFlight')
    form.attr('data-id', flight._id)
    form.find('input[name="destination"]').val(flight.destination);
    form.find('input[name="origin"]').val(flight.origin);
    form.find('input[name="departureDate"]').val(flight.departureDate);
    form.find('input[name="departureTime"]').val(flight.departureTime);
    form.find('input[name="cost"]').val(Number(flight.cost));
    form.find('input[name="seats"]').val(Number(flight.seats));
    form.find('input[name="img"]').val(flight.img);
    form.find('input[type="checkbox"]').val(flight.isPublic)

    viewEditFlight()
}

function editFlight() {
    let form = $('#formEditFlight')
    let destination = form.find('input[name="destination"]').val();
    let origin = form.find('input[name="origin"]').val();
    let departureDate = form.find('input[name="departureDate"]').val();
    let departureTime = form.find('input[name="departureTime"]').val();
    let cost = form.find('input[name="cost"]').val();
    let seats = form.find('input[name="seats"]').val();
    let img = form.find('input[name="img"]').val();
    let isPublic = form.find('input[type="checkbox"]').is(":checked")
    let id = form.attr('data-id')
    if (!destination) {
        showError('Destination is required!')
    } else if (!origin) {
        showError('Origin is required!')
    } else if (seats <= 0 || cost <= 0) {
        showError('Cost and seats must be positive numbers!')
    } else {
        let data = {destination, origin, departureDate, departureTime, seats, cost, img, isPublic}
        makeRequest('PUT', flightsUrl, "/" + id, getKinveyAuth(), data)
            .then(function () {
                showInfo('Flight edited.')
                showHomeView()
                $('#formEditFlight').trigger('reset')
            }).catch(handleAjaxError)
    }
}

//LOAD MY FLIGHTS
function myFlights() {
    let userId = sessionStorage.getItem('userId')
    makeRequest('GET', flightsUrl, `?query={"_acl.creator":"${userId}"}`, getKinveyAuth())
        .then(function (myFlights) {
            renderMyFlights(myFlights)
        }).catch(handleAjaxError)
}

function renderMyFlights(flights) {
    let myFlightsSection = $('#viewMyFlights')
    $('#viewMyFlights > div').remove();

    for (const flight of flights) {
        let flightDiv = $('<div class="flight-ticket">')

        let imageDiv = $(`  <div class="flight-left"><img src="${flight.img}" alt=""></div>`)
        flightDiv.append(imageDiv)

        let flightInfo = $('<div class="flight-right"></div>')
        flightInfo.append($(`<div><h3>${flight.destination}</h3><span>${flight.departureDate}</span></div>`))
            .append($(`<div>${flight.origin} <span>${flight.departureTime}</span></div>`))
            .append($(`<p>${flight.seats} Seats (${flight.cost}$ per seat) </p>`))

        let detailsLink=$('<a href="#" class="remove">DETAILS</a>')
        detailsLink.on('click',function () {
            displayFlightDetails(flight._id)
        })

        let removeLink=$('<a href="#" class="details">REMOVE</a>')
        removeLink.on('click',function () {
            deleteFlight(flight._id)
        })
        flightInfo.append(detailsLink)
        flightInfo.append(removeLink)
        flightDiv.append(flightInfo)

        myFlightsSection.append(flightDiv)
    }
}

//DELETE FLIGHT
function deleteFlight(id) {
    makeRequest('DELETE',flightsUrl,'/'+id,getKinveyAuth())
        .then(function () {
            viewMyFlights()
            showInfo('Flight deleted!')
        })
}


function signInUser(res, message) {
    saveUserSession(res)
    showHideMenuLinks()
    showHomeView()
    showInfo(message)
}

function saveUserSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('username', userInfo.username)
    sessionStorage.setItem('userId', userInfo._id)
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}
