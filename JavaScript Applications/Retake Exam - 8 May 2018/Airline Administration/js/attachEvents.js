function attachEvents() {
    $('#homeLink').on('click', showHomeView)
    $('#loginLink').on('click', showLoginView)
    $('#registerLink').on('click', showRegisterView)
    $('#flightsLink').on('click', viewMyFlights)
    $('#viewCatalog > a').on('click', viewAddFlight)

    //Attach form submit buttons events
    $('#register').on('click', function (event) {
        event.preventDefault()
        register()
    })
    $('#login').on('click', function (event) {
        event.preventDefault()
        login()
    })
    $('#logoutLink').find('a').on('click',logout)
    $('#addFlight').on('click', function (event) {
        event.preventDefault()
        addFlight()
    })
    $('#editBtn').on('click', function (event) {
        event.preventDefault()
        editFlight()
    })



    $('#infoBox').on('click', function () {
        $(this).fadeOut();
    })
    $('#errorBox').on('click', function () {
        $(this).fadeOut();
    })

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    })
}

