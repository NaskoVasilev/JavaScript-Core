handlers.displayHomeView = function (context) {
    let username=sessionStorage.getItem('username')
    if(!username) {
        context.loadPartials({
            navigation: './templates/common/navigation.hbs',
        }).then(function () {
            this.partial('./templates/homePage.hbs')
        })
    }else{
        context.redirect('#/cars')
    }
}

handlers.register = function (context) {
    context.loadPartials({
        navigation: './templates/common/navigation.hbs',
    }).then(function () {
        this.partial('./templates/forms/registerForm.hbs')
    })
}

handlers.registerAction = function (context) {
    let username=context.params.username;
    let password=context.params.password;
    let repeatPassword=context.params.repeatPassword;
    let usernamePattern=/^[A-Za-z]{3,}$/;
    let passwordPattern= /^[A-Za-z0-9]{6,}$/
    if(!usernamePattern.test(username)){
        notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
    }else if(!passwordPattern.test(password)){
        notify.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.')
    }else if(password!==repeatPassword){
        notify.showError('Both passwords should match!')
    }else{
        userController.register(username,password)
            .then((userInfo)=>{
                userController.saveSession(userInfo)
                notify.showInfo('User registration successful.')
                context.redirect('#/cars')
            }).catch(notify.handleError)
    }
}

handlers.login = function (context) {
    context.loadPartials({
        navigation: './templates/common/navigation.hbs',
    }).then(function () {
        this.partial('./templates/forms/loginForm.hbs')
    })
}

handlers.loginAction = function (context) {
    let username=context.params.username;
    let password=context.params.password;

    let usernamePattern=/^[A-Za-z]{3,}$/;
    let passwordPattern= /^[A-Za-z0-9]{6,}$/
    if(!usernamePattern.test(username)){
        notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
    }else if(!passwordPattern.test(password)){
        notify.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.')
    }else{
        userController.login(username,password)
            .then((userInfo)=>{
                userController.saveSession(userInfo)
                notify.showInfo('Login successful.')
                context.redirect('#/cars')
            }).catch(notify.handleError)
    }
}

handlers.logout=function (context) {
    userController.logout()
        .then(()=>{
            sessionStorage.clear()
            notify.showInfo('Logout successful.')
            context.redirect('#/home')
    }).catch(notify.handleError)
}