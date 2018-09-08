$(() => {
    function redirectToLogin(ctx) {
        if (!userController.isAuth()) {
            ctx.redirect('#/login')
        }
    }

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.get('index.html', function () {
            if (userController.isAuth()) {
                this.redirect('#/home')
            } else {
                this.redirect('#/login')
            }
        })

        //  LOGIN, REGISTER, LOGOUT USER
        this.get('#/login', function (context) {
            this.partial('./templates/forms/loginForm.hbs')
        })
        this.post('#/login', function (context) {
            let username = context.params.username;
            let password = context.params.password;
            if (username.length < 5) {
                notification.showError('A username should be a string with at least 5 characters long.')
            } else if (!password) {
                notification.showError('Password cannot be empty string!')
            } else {
                userController.login(username, password)
                    .then((userInfo) => {
                        userController.saveSessionAndShowInfo(userInfo, 'Login successful.')
                        context.redirect('#/home')
                    }).catch(notification.handleError)
            }
        })

        this.get('#/register', function (context) {
            this.partial('./templates/forms/registerForm.hbs')
        })
        this.post('#/register', function (context) {
            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPassword;
            if (username.length < 5) {
                notification.showError('A username should be a string with at least 5 characters long.')
            } else if (!password) {
                notification.showError('Password cannot be empty string!')
            } else if (password !== repeatPassword) {
                notification.showError('Both passwords should match!')
            } else {
                userController.register(username, password)
                    .then((userInfo) => {
                        userController.saveSessionAndShowInfo(userInfo, 'User registration successful.')
                        context.redirect('#/home')
                    }).catch(notification.handleError)
            }
        })

        this.get('#/logout', function (context) {
            userController.logout()
                .then(function () {
                    sessionStorage.clear()
                    notification.showInfo('Logout successful.')
                    context.redirect('#/login')
                })

        })

        //HOME SCREEN
        this.get('#/home', function (context) {
            redirectToLogin(context)

            let username = sessionStorage.getItem('username')
            let subscriptions=[]
            if(sessionStorage.getItem('subscriptions')!=="undefined"){
                subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
            }

            let followingCount = subscriptions.length;
            let chirpsCountPromise = profileController.countChirps(username);
            let followersCountPromise = profileController.countFollowers(username)
            let allChirpsPromise = chirpsController.listChirpsFromSubscriptions()

            Promise.all([allChirpsPromise, chirpsCountPromise, followersCountPromise])
                .then(function ([allChirps, chirpsCount, followersCount]) {
                    let chirps = []
                    for (const chirp of allChirps) {
                        if (subscriptions.includes(chirp.author)) {
                            chirps.push(chirp)
                        }
                    }
                    chirps.forEach(c => {
                        c.date = chirpsController.calcTime(c._kmd.ect)
                    })
                    context.chirps = chirps;
                    context.username = sessionStorage.getItem('username')
                    context.chirpsCount = chirpsCount.length
                    context.followingCount = followingCount
                    context.followersCount = followersCount.length

                    context.loadPartials({
                        navigation: './templates/navigation.hbs',
                        createChirpForm: './templates/forms/createChirpForm.hbs',
                    }).then(function () {
                        this.partial('./templates/home.hbs')
                    })
                }).catch(notification.handleError)
        })

        //CREATE CHIRP
        this.post('#/create', function (context) {
            let text = context.params.text;
            if (text.length === 0 || text.length > 150) {
                notification.showError('A chirp text shouldn’t be empty and shouldn’t contain more than 150 symbols.')
                return;
            }
            chirpsController.create(text)
                .then(function () {
                    notification.showInfo('Chirp published.')
                    context.redirect('#/myChirps')
                })
        })

        //GET USER OWN CHIRPS
        this.get('#/myChirps', function (context) {
            redirectToLogin(context)
            let username = sessionStorage.getItem('username')
            let subscriptions = []
            if (sessionStorage.getItem('subscriptions')!=='undefined') {
                subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
            }
            let followingCount =subscriptions.length;
            let chirpsCountPromise = profileController.countChirps(username);
            let followersCountPromise = profileController.countFollowers(username)
            let myChirpsPromise = chirpsController.getMyChirps(username)

            Promise.all([myChirpsPromise, chirpsCountPromise, followersCountPromise])
                .then(function ([chirps, chirpsCount, followersCount]) {
                    chirps.forEach(c => {
                        c.date = chirpsController.calcTime(c._kmd.ect)
                    })
                    context.chirps = chirps;
                    context.username = sessionStorage.getItem('username')
                    context.chirpsCount = chirpsCount.length
                    context.followingCount = followingCount;
                    context.followersCount = followersCount.length
                    context.loadPartials({
                        navigation: './templates/navigation.hbs',
                        createChirpForm: './templates/forms/createChirpForm.hbs',
                    }).then(function () {
                        this.partial('./templates/myChirps.hbs')
                    })
                }).catch(notification.handleError)
        })
        this.get('#/profile/:username', function (context) {
            redirectToLogin(context)
            let username = context.params.username;
            let chirpsCountPromise = profileController.countChirps(username);
            let followingCountPromise = profileController.countFollowingUsers(username)
            let followersCountPromise = profileController.countFollowers(username)
            let myChirpsPromise = chirpsController.getMyChirps(username)

            Promise.all([myChirpsPromise, chirpsCountPromise, followersCountPromise, followingCountPromise])
                .then(function ([chirps, chirpsCount, followersCount, followingCount]) {
                    chirps.forEach(c => {
                        c.date = chirpsController.calcTime(c._kmd.ect)
                    })
                    let subscriptions=[]
                    if(sessionStorage.getItem('subscriptions')!=="undefined"){
                        subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
                    }
                    context.isFollowing = subscriptions.includes(username)
                    context.chirps = chirps;
                    context.username = username
                    context.chirpsCount = chirpsCount.length
                    context.followingCount = followingCount[0].subscriptions.length
                    context.followersCount = followersCount.length
                    context.loadPartials({
                        navigation: './templates/navigation.hbs',
                        createChirpForm: './templates/forms/createChirpForm.hbs',
                    }).then(function () {
                        this.partial('./templates/profile.hbs')
                    })
                }).catch(notification.handleError)
        })

        this.get('#/delete/:id', function (context) {
            let id = context.params.id
            chirpsController.deleteChirp(id)
                .then(function () {
                    notification.showInfo('Chirp deleted.')
                    context.redirect('#/myChirps')
                }).catch(notification.handleError)
        })

        this.get('#/discover', function (context) {
            userController.getAllUsers()
                .then(function (users) {
                    users.forEach(u => {
                        if(!u.subscriptions){
                            u.subscriptions=[]
                        }
                    })
                    users.forEach(u => {
                        u.followersCount = users.filter(a => a.subscriptions.includes(u.username)).length
                    })
                    users.forEach(u => {
                        if (u.username === sessionStorage.getItem('username')) {
                            let index = users.indexOf(u);
                            users.splice(index, 1)
                        }
                    })
                    users.sort((a,b)=>{
                       return b.followersCount-a.followersCount;
                    })
                    context.users = users;
                    context.loadPartials({
                        navigation: './templates/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/discover.hbs')
                    })
                }).catch(notification.handleError)
        })

        this.get('#/follow/:username', function (context) {
            let username = context.params.username
            userController.followUser(username)
                .then(function (user) {
                    userController.saveUserSession(user)
                    notification.showInfo(`Subscribed to ${username}`)
                    context.redirect(`#/profile/${username}`)
                })
        })

        this.get('#/unfollow/:username', function (context) {
            let username = context.params.username
            userController.unfollowUser(username)
                .then(function (user) {
                    userController.saveUserSession(user)
                    notification.showInfo(`Unsubscribed to ${username}`)
                    context.redirect(`#/profile/${username}`)
                })
        })
    })


    app.run()
})