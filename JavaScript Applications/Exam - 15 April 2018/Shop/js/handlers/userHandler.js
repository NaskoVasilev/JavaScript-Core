handlers.displayWelcomePage=function (context) {
    context.loadPartials({
        footer:'./templates/common/footer.hbs',
        loginForm:'./templates/forms/loginForm.hbs',
        registerForm:'./templates/forms/registerForm.hbs',
    }).then(function(){
        this.partial('./templates/welcomePage.hbs')
    })
}

handlers.registerUser=function (context) {
    let username=context.params.username;
    let password=context.params.password;
    let repeatPassword=context.params.repeatPassword;

    if(username.length<5){
        notify.showError('A username should be a string with at least 5 characters long.')
    }else if(!password){
        notify.showError('Passwords input fields shouldn’t be empty.')
    }else if(password!==repeatPassword){
        notify.showError('Passwords must match!')
    }else{
        userController.register(username,password)
            .then(function (userInfo) {
                userController.saveSession(userInfo)
                notify.showInfo('User registration successful.')
                context.redirect('#/editor')
            }).catch(notify.handleError)
    }

}

handlers.loginUser=function (context) {
    let username=context.params.username;
    let password=context.params.password;
    if(username.length<5){
        notify.showError('A username should be a string with at least 5 characters long.')
    }else if(!password){
        notify.showError('Passwords input fields shouldn’t be empty.')
    }else{
        userController.login(username,password)
            .then(function (userInfo) {
                userController.saveSession(userInfo)
                notify.showInfo('Login successful.')
                context.redirect('#/editor')
            }).catch(notify.handleError)
    }
}

handlers.logoutUser=function (context) {
    userController.logout()
        .then(function () {
            sessionStorage.clear()
            notify.showInfo('Logout successful.')
            context.redirect('#/home')
        }).catch(notify.handleError)

}
