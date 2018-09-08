handlers.displayHomeView = function (context) {
    let username = sessionStorage.getItem('username')
    context.username = username

    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        if (username) {
            this.partial('./templates/home.hbs')
        } else {
            this.partial('./templates/welcomePage.hbs')
        }
    })
}

handlers.register = function (context) {
    context.username = sessionStorage.getItem('username')
    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/forms/registerForm.hbs')
    })
}

handlers.registerAction = function (context) {
    let username = context.params.username;
    let password = context.params.password
    let name = context.params.name

    userController.register(username, password, name)
        .then((userInfo) => {
            userController.saveSession(userInfo)
            notify.showInfo('User registration successful.')
            context.redirect('#/home')
        }).catch(notify.handleError)
}

handlers.login = function (context) {
    context.username = sessionStorage.getItem('username')
    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/forms/loginForm.hbs')
    })
}

handlers.loginAction = function (context) {
    let username = context.params.username;
    let password = context.params.password

    userController.login(username, password)
        .then((userInfo) => {
            userController.saveSession(userInfo)
            notify.showInfo('User login successful.')
            context.redirect('#/home')
        }).catch(notify.handleError)
}

handlers.logout = function (context) {
    userController.logout()
        .then(() => {
            sessionStorage.clear()
            notify.showInfo('Logged out!')
            context.redirect('#/home')
        }).catch(notify.handleError)
}