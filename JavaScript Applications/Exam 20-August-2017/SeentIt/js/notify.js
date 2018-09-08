$(() => {
    $('#errorBox').on('click', function () {
        $('#errorBox').fadeOut()

    })

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    })

    $('#infoBox').on('click', function () {
        $('#infoBox').fadeOut()
    })
})
let notification = (function () {
    function handleError(err) {
        showError(err.responseJSON.description)
    }

    function showError(error) {
        let errorBox = $('#errorBox')
        errorBox.find('span').text(error)
        errorBox.fadeIn();
        setTimeout(function () {
            errorBox.fadeOut()
        }, 3000)
    }

    function showInfo(message) {
        let infoBox = $('#infoBox')
        infoBox.find('span').text(message)
        infoBox.fadeIn();
        setTimeout(function () {
            infoBox.fadeOut()
        }, 3000)
    }

    return {
        showError,
        showInfo,
        handleError
    }
})()