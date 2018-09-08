function attachEvents() {
    const appId = 'kid_ryuKMYZvQ';
    const url = "https://baas.kinvey.com/appdata/" + appId + '/books';
    const username = 'nasko';
    const password = 'nasko';
    const base64 = btoa(username + ':' + password);
    const authHeaders = {'Content-type': 'application/json', 'Authorization': 'Basic ' + base64}
    const booksDiv = $('#books');

    function request(method, endpoint, data) {
        return $.ajax({
            method: method,
            url: url + endpoint,
            headers: authHeaders,
            data: JSON.stringify(data)
        })
    }

    $('#load').on('click', loadBooks)

    function loadBooks() {
        request('GET', "")
            .then(displayBooks)
            .catch(handleError)
    }

    function displayBooks(books) {
        booksDiv.empty();
        for (const book of books) {
            let bookDiv = $(`<div class="book" data-id="${book._id}">`)
                .append($(`<label>Title </label>`))
                .append($(`<input type="text" class="title" value="${book.title}"/>`))
                .append($(`<label>Author </label>`))
                .append($(`<input type="text" class="author" value="${book.author}"/>`))
                .append($(`<label>ISBN </label>`))
                .append($(`<input type="text" class="isbn" value="${book.isbn}"/>`))
                .append($('<button class="update">Update</button>')
                    .on('click',updateBook))
                .append($('<button class="delete">Delete</button>')
                    .on('click', deleteBook))
            booksDiv.append(bookDiv)
        }
    }

    $('#create').on('click', createBook)

    function createBook(event) {
        event.preventDefault()
        let form =$('#addForm')
        let data=getObject(form)
        console.log(data)
        request("POST","",data)
            .then(loadBooks)
            .catch(handleError)
    }

    function getObject(element){
        return{
            title:$(element).find('.title').val(),
            author:$(element).find('.author').val(),
            isbn:$(element).find('.isbn').val()
        }
    }


    function updateBook() {
        let book=$(this).parent()
        let id=$(book).attr('data-id')
        let data=getObject(book);
        let endpoint='/'+id;
        request("PUT",endpoint,data)
            .then(function () {
                console.log('updated')
            }).catch(handleError)
    }

    function deleteBook() {
        let book=$(this).parent()
        let id=$(book).attr('data-id')
        let endpoint='/'+id;
        request("DELETE",endpoint)
            .then(function () {
                $(book).remove()
            }).catch(handleError)

    }

    function handleError() {
        booksDiv.empty()
        booksDiv.text('Error')
    }

}