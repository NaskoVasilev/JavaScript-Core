function attachAllEvents() {
    $('#linkHome').on('click',showHomeView)
    $('#linkLogin').on('click',showLoginView)
    $('#linkRegister').on('click',showRegisterView)
    $('#linkListAds').on('click',function () {
        listAllProducts()
    })
    $('#linkCreateAd').on('click',showCreateAdView)
    $('#linkLogout').on('click',logout)

    $('#buttonLoginUser').on('click',login)
    $('#buttonRegisterUser').on('click',register)
    $('#buttonCreateAd').on('click',createProduct)
    $('#buttonEditAd').on('click',editProduct)

    $('#infoBox', '#errorBox').on('click',function () {
        $(this).fadeOut();
    })

    $(document).on({
        ajaxStart:function () {
            $('#loadingBox').show()
        },
        ajaxStop:function () {
            $('#loadingBox').hide()
        }
    })
}