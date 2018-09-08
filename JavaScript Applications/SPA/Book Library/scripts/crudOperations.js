const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_H1QFu_GDQ'
const APP_SECRET = 'd901a4f8b8444ef3be47d425ff47432a'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}
const BOOKS_PER_PAGE = 10

function loginUser() {
    let userData = {
        username: $('#formLogin input[name=username]').val(),
        password: $('#formLogin input[name=passwd]').val()
    }
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: userData
    }).then(function (res) {
        signInUser(res, 'Login successful.')
    }).catch(handleAjaxError)
}

function registerUser() {
    let userData = {
        username: $('#formRegister input[name=username]').val(),
        password: $('#formRegister input[name=passwd]').val()
    }
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: AUTH_HEADERS,
        data: userData
    }).then(function (res) {
        signInUser(res, 'Registration successful.')
    }).catch(handleAjaxError)
}

function listBooks() {
    $.ajax({
        method: "GET",
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: getUserAuthenticationHeaders(),
    }).then(function (res) {
        showView("viewBooks")
        displayPaginationAndBooks(res.reverse())
    }).catch(handleAjaxError)
}

function createBook() {
    let title=$('#formCreateBook input[name=title]').val();
    let author=$('#formCreateBook input[name=author]').val();
    let description=$('#formCreateBook textarea[name=description]').val();
    $.ajax({
        method:'POST',
        url:BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers:getUserAuthenticationHeaders(),
        data:{title,author,description}
    }).then(function () {
        showInfo('Book created')
        listBooks()
    }).catch(handleAjaxError)
}

function deleteBook(book) {
    $.ajax({
        method:"DELETE",
        url:BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id,
        headers:getUserAuthenticationHeaders()
    }).then(function () {
        showInfo('Book deleted')
        listBooks()
    }).catch(handleAjaxError)
}

function loadBookForEdit(book) {
    showView('viewEditBook')
    $('#formEditBook input[name=id]').val(book._id)
    $('#formEditBook input[name=title]').val(book.title)
    $('#formEditBook input[name=author]').val(book.author)
    $('#formEditBook textarea[name=description]').val(book.description)
}

function editBook() {
    let id=$('#formEditBook input[name=id]').val()
    let title=$('#formEditBook input[name=title]').val()
    let author=$('#formEditBook input[name=author]').val()
    let description = $('#formEditBook textarea[name=description]').val()

    $.ajax({
        method:'PUT',
        url:BASE_URL + 'appdata/' + APP_KEY + '/books/' + id,
        headers:getUserAuthenticationHeaders(),
        data:{title,author,description}
    }).then(function () {
        showInfo('Book edited')
        listBooks()
    }).catch(handleAjaxError)
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('username', userInfo.username)
    sessionStorage.setItem('userId', userInfo._id)
}

function logoutUser() {
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
    })
    sessionStorage.clear()
    $('#loggedInUser').text("")
    showHideMenuLinks()
    showHomeView()
    showInfo('Logout successful.')
}

function signInUser(res, message) {
    saveAuthInSession(res)
    showHideMenuLinks()
    showHomeView()
    showInfo(message);
}

function displayPaginationAndBooks(books) {
    let pagination = $('#pagination-demo')
    if (pagination.data("twbs-pagination")) {
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            let table = $('#books table')
            let rows = table.find('tr')
            for (let i = 1; i < rows.length; i++) {
                $(rows[i]).remove()
            }
            let startBook = (page - 1) * BOOKS_PER_PAGE
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length)
            $(`a:contains(${page})`).addClass('active')
            for (let i = startBook; i < endBook; i++) {
                let tr = $('<tr>')
                tr.append($(`<td>${books[i].title}</td>`))
                    .append($(`<td>${books[i].author}</td>`))
                    .append($(`<td>${books[i].description}</td>`))
                if(books[i]._acl.creator===sessionStorage.getItem('userId')){
                    let td=$("<td>")
                    let editBtn=$('<a href="#">[Edit]</a>')
                        .on('click',function () {
                            loadBookForEdit(books[i])
                        })
                    let deleteBtn=$('<a href="#">[Delete]</a>')
                        .on('click',function () {
                            deleteBook(books[i])
                        })
                    tr.append(td.append(editBtn).append(deleteBtn))
                }
                $(table).append(tr)
            }
        }
    })
}

function getUserAuthenticationHeaders() {
    return {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')}
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}