function showView(viewId) {
    $('body').find('section').hide();
    $('#'+viewId).show();
}

function showHideMenuLinks() {
    if(sessionStorage.getItem('authToken')
    &&sessionStorage.getItem('username')){
        $('#homeLink').show()
        $('#flightsLink').show()
        $('#loginLink').hide()
        $('#registerLink').hide()
        $('#logoutLink').find('span').text('Welcome '+sessionStorage.getItem('username')+" |")
        $('#logoutLink').show()
    }else{
        $('#homeLink').hide()
        $('#flightsLink').hide()
        $('#loginLink').show()
        $('#registerLink').show()
        $('#logoutLink').hide()
    }
}

function showHomeView() {
    showView('viewCatalog')
    showAllPublicFlights()
}

function showInfo(message) {
    let infoBox = $('#infoBox')
    infoBox.find('span').text(message)
    infoBox.show()
    setTimeout(function() {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(err){
    let errorBox=$('#errorBox');
    errorBox.find('span').text(err);
    errorBox.show();
}

function showRegisterView() {
    showView('viewRegister')
}

function showLoginView() {
    showView('viewLogin')
}

function viewAddFlight() {
    showView('viewAddFlight')
}

function viewFlightDetails() {
 showView('viewFlightDetails')
}

function viewEditFlight() {
    showView('viewEditFlight')
}

function viewMyFlights() {
    myFlights()
    showView('viewMyFlights')
}
