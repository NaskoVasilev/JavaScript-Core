$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.get('index.html', displayHome)
        this.get('#/home', displayHome)

        function displayHome(context) {
            context.loggedIn = sessionStorage.getItem('authToken') !== null;
            context.partial('./templates/home.hbs')
        }

        this.get('#/login', function () {
            this.partial('./templates/login.hbs')
        })
        this.post('#/login', function (context) {
            controller.login(
                context.params.username,
                context.params.password
            ).then(function (userInfo) {
                controller.saveUserSession(userInfo)
                controller.showHideWellcomeMessage()
                controller.showHideMenuLinks()
                controller.showInfo('Login successfully')
                context.redirect('#/contacts')
            }).catch(controller.handleError)
        })
        this.get('#/register', function () {
            this.partial('./templates/register.hbs')
        })
        this.post('#/register', function (context) {
            let password = context.params.password;
            let repeatPassword = context.params.repeatPassword;
            if (password !== repeatPassword) {
                controller.showError('Passwords must match')
            }else{
                controller.register(
                    context.params.username,
                    password,
                    context.params.fullName,
                    context.params.email,
                    context.params.phone
                ).then(function (userInfo) {
                    controller.saveUserSession(userInfo)
                    controller.showHideWellcomeMessage()
                    controller.showHideMenuLinks()
                    controller.showInfo('Register successfully')
                    context.redirect('#/contacts')
                }).catch(controller.handleError)
            }
        });
        this.get('#/logout', function () {
            let that = this;
            controller.logout()
                .then(function () {
                    sessionStorage.clear();
                    controller.showHideWellcomeMessage()
                    controller.showHideMenuLinks()
                    that.redirect('#/login')
                }).catch(controller.handleError)
        })
        this.get('#/profile', function () {
            this.fullName = sessionStorage.getItem('fullName')
            this.phone = sessionStorage.getItem('phone')
            this.email = sessionStorage.getItem('email')
            this.partial('./templates/profile.hbs')
        })
        this.put('#/profile', function (context) {
            controller.changeUserProfile(
                context.params.fullName,
                context.params.phone,
                context.params.email,
            ).then(function (userInfo) {
                controller.saveUserSession(userInfo)
                controller.showHideWellcomeMessage()
                controller.showHideMenuLinks()
                controller.showInfo('Edit your profile successfully!')
                context.redirect('#/contacts')
            }).catch(controller.handleError)
        })

        this.get('#/contacts', function (context) {
            controller.getUsers()
                .then(function (users) {
                    context.users = users;
                    context.partial('./templates/contacts.hbs')
                })
        })
    })
    app.run();
});

function showDetails(event) {
    let userId = $(event.target).attr('data-id')
    let details = $('#details')
    controller.getUser(userId)
        .then(function (user) {
            $.get('./templates/details.hbs')
                .then(function (templateHtml) {
                    let template = Handlebars.compile(templateHtml)
                    let html = template(user)
                    details.html(html)
                    $(".contact").removeClass('highlight')
                    $(event.target).addClass('highlight')
                })
        })
}