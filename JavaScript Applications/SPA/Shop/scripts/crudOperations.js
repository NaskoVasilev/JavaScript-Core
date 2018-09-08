const appKey = 'kid_SJPGDZ7PX';
const appSecret = '5332999935004df295d70d033aef5cf0';
const baseUrl = 'https://baas.kinvey.com/';
const basicAuth = {'Authorization': "Basic " + btoa(appKey + ":" + appSecret)}
const viewCountUrl = 'appdata/' + appKey + '/viewCount'
const endpoint = 'appdata/' + appKey + '/products';

function getUserAuth() {
    return {
        'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`
    }
}

function request(method, endpoint, auth, data) {
    return $.ajax({
        method: method,
        url: baseUrl + endpoint,
        headers: auth,
        data: data
    })
}

function login() {
    let form = $('#formLogin')
    let username = form.find('input[name="username"]').val()
    let password = form.find('input[name="passwd"]').val()
    let endpoint = 'user/' + appKey + '/login';
    let data = {username, password}

    request('POST', endpoint, basicAuth, data).then(function (res) {
        signInUser(res, 'Login successfully')
    }).catch(handleAjaxError)
}

function register() {
    let form = $('#formRegister')
    let username = form.find('input[name="username"]').val()
    let password = form.find('input[name="passwd"]').val()
    let endpoint = 'user/' + appKey + '/';
    let data = {username, password}

    request('POST', endpoint, basicAuth, data).then(function (res) {
        signInUser(res, 'Registration successful')
    }).catch(handleAjaxError)
}

function listAllProducts() {
    request('GET', endpoint, getUserAuth())
        .then(function (products) {
            products.sort((a, b) => {
                return Number(b.viewCount) - Number(a.viewCount)
            })
            let table = $('#ads table')
            let rows = table.find('tr')
            for (let i = 1; i < rows.length; i++) {
                $(rows[i]).remove()
            }
            showView('viewAds')
            for (const product of products) {
                let tr = $('<tr>')
                tr.append($(`<td>${product.title}</td>`))
                    .append($(`<td>${product.publisher}</td>`))
                    .append($(`<td>${product.price}</td>`))
                    .append($(`<td>${product.date}</td>`));
                let readMoreBtn = $('<button>&#9757;</button>')
                    .on('click', function () {
                        showDetails(product)
                    })
                let td = $("<td>")
                td.append(readMoreBtn)
                if (product._acl.creator === sessionStorage.getItem('userId')) {
                    let editBtn = $('<button>&#9997;</button>')
                        .on('click', function () {
                            listProductForEditing(product)
                        })
                    let deleteBtn = $('<button>&#10006;</button>')
                        .on('click', function () {
                            deleteProduct(product)
                        })
                    td.append(editBtn).append(deleteBtn)
                }
                tr.append(td)
                table.append(tr)
            }
        })
}

function showDetails(product) {
    product.viewCount = Number(product.viewCount) + 1;
    request('PUT', endpoint + '/' + product._id, getUserAuth(), product)
    let detailsDiv = $('#productDetails')
    detailsDiv.find('#title').text('Title: ' + product.title)
    detailsDiv.find('#description').text('Description: ' + product.description)
    detailsDiv.find('#date').text('Date published: ' + product.date)
    detailsDiv.find('#publisher').text('Publisher: ' + product.publisher)
    detailsDiv.find('#price').text('Price: ' + Number(product.price).toFixed(2) + ' lv')
    detailsDiv.find('#viewCount').text('View counts: ' + product.viewCount)
    showView('productDetails')
}

function createProduct() {
    let form = $('#formCreateAd')
    let title = form.find('input[name="title"]').val()
    let description = form.find('textarea[name="description"]').val()
    let price = Number(form.find('input[name="price"]').val())
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let date = `${day}.${month}.${year}`
    let viewCount = 0;
    let publisher = sessionStorage.getItem('username')
    if (!title) {
        showError('Title is required')
    }
    if (!price || Number.isNaN(price)) {
        showError('Price is required')
    }
    let data = {title, description, date, price, publisher, viewCount}

    request("POST", endpoint, getUserAuth(), data)
        .then(listAllProducts).
    catch(handleAjaxError)
}

function listProductForEditing(product) {
    showView('viewEditAd')
    $('#formEditAd input[name=id]').val(product._id)
    $('#formEditAd input[name=publisher]').val(product.publisher)
    $('#formEditAd input[name=date]').val(product.date)
    $('#formEditAd input[name=viewCount]').val(product.viewCount)
    $('#formEditAd input[name=title]').val(product.title)
    $('#formEditAd textarea[name=description]').val(product.description)
    $('#formEditAd input[name=price]').val(product.price)
}

function editProduct() {
    let title = $('#formEditAd input[name=title]').val()
    let description = $('#formEditAd textarea[name=description]').val()
    let price = $('#formEditAd input[name=price]').val()
    let id = $('#formEditAd input[name=id]').val()
    let publisher = $('#formEditAd input[name=publisher]').val()
    let date = $('#formEditAd input[name=date]').val()
    let viewCount = $('#formEditAd input[name=viewCount]').val()
    let data = {title, description, price, publisher, date, viewCount}

    request("PUT", endpoint + '/' + id, getUserAuth(), data)
        .then(listAllProducts)
        .catch(handleAjaxError)
}

function deleteProduct(product) {
    request('DELETE', endpoint + '/' + product._id, getUserAuth())
        .then(listAllProducts)
        .catch(handleAjaxError)
}

function logout() {
    let endpoint = 'user/' + appKey + '/_logout';
    request('POST', endpoint, getUserAuth())
        .then(function () {
            sessionStorage.clear()
            showHideMenuLinks();
            showInfo('Logout successfully')
        }).catch(handleAjaxError)
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
