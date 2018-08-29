function validate() {
    let username = $('#username')
    let email = $('#email')
    let password = $('#password')
    let confirmPassword = $('#confirm-password')
    let companyCheckBox = $('#company');
    let companyInfo = $('#companyInfo');
    let companyNumber = $('#companyNumber');
    let submitBtn = $("#submit")
    let validation = $('#valid');

    let isValid = true;

    submitBtn.on('click', function (event) {
        event.preventDefault()
        formValidate();
        if (isValid) {
            validation.css('display', 'block')
        }
        else {
            validation.css('display', 'none')
            isValid = true;
        }
    })

    companyCheckBox.on('click', function () {
        if (companyCheckBox.is(':checked')) {
            companyInfo.css("display", 'block')
        }
        else {
            companyInfo.css("display", 'none')
        }
    })


    function formValidate() {
        inputIsValid(username, /^[a-zA-Z0-9]{3,20}$/)

        if (password.val() !== confirmPassword.val()) {
            password.css('border-color', 'red')
            confirmPassword.css('border-color', 'red')
            isValid = false;
        }
        else {
            inputIsValid(password, /^\w{5,15}$/)
            inputIsValid(confirmPassword, /^\w{5,15}$/)
        }

        inputIsValid(email, /^.*?@.*?\..*?$/)

        if (companyCheckBox.is(':checked')) {
            inputIsValid(companyNumber, /^[1-9][0-9]{3}$/);
        }
    }

    function inputIsValid(input, pattern) {
        if (!pattern.test(input.val())) {
            input.css('border-color', 'red')
            isValid = false;
        }
        else {
            input.css('border', 'none')
        }
    }
}

