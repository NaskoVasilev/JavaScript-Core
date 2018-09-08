function showView(element) {
    $('main > section').hide();
    $('#'+element).show();
}

function showHideMenuLinks() {
    $('#linkHome').show();
    if(sessionStorage.getItem('username')
    &&sessionStorage.getItem('authToken')){
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();
    }else{
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
        $('#linkLogout').hide();
    }
}

function showInfo(message) {
    let infoBox = $('#infoBox')
    infoBox.text(message)
    infoBox.show()
    setTimeout(function() {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(err){
    let errorBox=$('#errorBox');
    errorBox.text(err);
    errorBox.show();
}
function showHomeView() {
    showView('viewHome')
}

function showLoginView() {
    $('#formLogin').trigger('reset')
    showView('viewLogin');
}

function showRegisterView() {
    $('#formRegister').trigger('reset')
    showView('viewRegister')
}

function showCreateAdView() {
    $('#formCreateAd').trigger('reset')
    showView('viewCreateAd')
}
