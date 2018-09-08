$(function () {
    $('#btnLoad').on('click', loadContacts)
    $('#btnCreate').on('click', createContact)
    const url = 'https://phonebook-c9682.firebaseio.com/phonebook';
    let phonebook = $('#phonebook');

    function loadContacts() {
        phonebook.empty();
        $.get(url+'.json')
            .then(displayContacts)
            .catch(displayError)
    }

    function createContact() {
        let nameInput = $('#person')
        let phoneInput = $('#phone')
        let newContact = JSON.stringify({
            name:nameInput.val(),
            phone:phoneInput.val()
        })

        $.post(url+'.json',newContact)
            .then(loadContacts)
            .catch(displayError)

        nameInput.val('')
        phoneInput.val('')
    }

    function displayError() {
        phonebook.append($('<li>Error</li>'));
    }

    function displayContacts(contacts) {
        for (const id in contacts) {
            let name = contacts[id]['name'];
            let phone = contacts[id]['phone'];

            let li = $('<li>');
            li.text(`${name}: ${phone}`)
            let deleteBtn = $('<button>[Delete]</button>')
            deleteBtn.on('click', deleteContact.bind(this, id))
            phonebook.append(li.append(deleteBtn));
        }
    }

    function deleteContact(id) {
        $.ajax({
            method:'DELETE',
            url:url+'/'+id+'.json'
        }).then(loadContacts)
            .catch(displayError)
    }

})