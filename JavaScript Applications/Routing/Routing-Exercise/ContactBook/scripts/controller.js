$(() => {
    controller.showHideMenuLinks()
})
const appKey = 'kid_ByRW9TBv7';
const appSecret = '440a5976a8084900b467217a503c6b5f';
const baseUrl = 'https://baas.kinvey.com/';
const basicAuth = {'Authorization': "Basic " + btoa(appKey + ":" + appSecret)}

function getUserAuth() {
    return {
        'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`
    }
}

const controller = (function () {
    function request(method, endpoint, auth, data) {
        return $.ajax({
            method: method,
            url: baseUrl + 'user/' + appKey + '/' + endpoint,
            headers: auth,
            data: data
        })
    }

    function register(username, password, fullName, email, phone) {
        let data = {username, password, fullName, email, phone}
        return request("POST", "", basicAuth, data)
    }

    function login(username, password) {
        let data = {username, password}
        return request("POST", "login", basicAuth, data)
    }

    function logout() {
        return request('POST', '_logout', getUserAuth())

    }

    function changeUserProfile(fullName, phone, email) {
        let id = sessionStorage.getItem('id')
        let data = {fullName, phone, email}
        return request('PUT', id, getUserAuth(), data)
    }

    function getUsers() {
        return request('GET', '', getUserAuth())
    }

    function getUser(userId) {
        return request('GET', `${userId}`, getUserAuth())
    }

    function saveUserSession(userData) {
        console.log('add session')
        sessionStorage.setItem('authToken', userData._kmd.authtoken)
        sessionStorage.setItem('fullName', userData.fullName)
        sessionStorage.setItem('phone', userData.phone)
        sessionStorage.setItem('email', userData.email)
        sessionStorage.setItem('id', userData._id)
    }

    function showHideWellcomeMessage() {
        let fullName = sessionStorage.getItem('fullName')
        if (fullName) {
            $('#welcome').text('Hello ' + fullName + "!")
        } else {
            $('#welcome').text('')
        }
    }

    function showInfo(message) {
        let messageDiv = $('#infoBox')
        messageDiv.text(message)
        messageDiv.show()
        setTimeout(function () {
            messageDiv.fadeOut()
        }, 3000)
    }

    function showError(message) {
        let errorDiv = $('#errorBox')
        errorDiv.text(message)
        errorDiv.show()
        setTimeout(function () {
            errorDiv.fadeOut()
        }, 3000)
    }

    function handleError(err) {
        showError(err)
    }

    function showHideMenuLinks() {
        $('#home').show()
        if (sessionStorage.getItem('fullName')) {
            $('#login').hide()
            $('#register').hide()
            $('#profile').show()
            $('#logout').show()
            $('#contacts').show()
        } else {
            $('#login').show()
            $('#register').show()
            $('#profile').hide()
            $('#logout').hide()
            $('#contacts').hide()
        }
    }

    return {
        register,
        login,
        logout,
        changeUserProfile,
        getUsers,
        showHideWellcomeMessage,
        showHideMenuLinks,
        saveUserSession,
        showInfo,
        showError,
        getUser
    }
})()