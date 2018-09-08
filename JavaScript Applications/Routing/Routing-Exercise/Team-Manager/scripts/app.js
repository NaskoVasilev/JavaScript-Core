$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')
//DISPLAY HOME VIEW
        this.get('index.html', displayHome)
        this.get('#/home', displayHome)

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.hasTeam = sessionStorage.getItem('teamId') !== null
                && sessionStorage.getItem('teamId') !== 'undefined';
            ctx.teamId = sessionStorage.getItem('teamId');
            ctx.username = sessionStorage.getItem('username')
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs')
            })
        }

        this.get('#/about', function (ctx) {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username')
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs')
            })
        })

        //LOGIN USER
        this.get('#/login', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            })
        })

        this.post('#/login', function (context) {
            let username = this.params.username;
            let password = this.params.password;
            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo)
                    auth.showInfo('Successfully  logged in!')
                    displayHome(context)
                }).catch(auth.handleError)
        })

        //REGISTER USER
        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            }).catch(auth.handleError)
        })

        this.post('#/register', function (context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;
            if (password !== repeatPassword) {
                auth.showError('Passwords should match!')
            } else {
                auth.register(username, password)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo)
                        auth.showInfo('Successfully  registered!')
                        displayHome(context)
                    }).catch(auth.handleError)
            }
        })

        //LOGOUT USER
        this.get('#/logout', function (context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Successfully logout!')
                    displayHome(context)
                }).catch(auth.handleError)
        })

        //GET CATALOG PAGE
        this.get('#/catalog', displayCatalog)

        function displayCatalog(context) {
            teamsService.loadTeams()
                .then(function (teams) {
                    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    context.username = sessionStorage.getItem('username')
                    context.hasNoTeam = sessionStorage.getItem('teamId') === null
                    ||sessionStorage.getItem('teamId') === 'undefined';
                    context.hasTeam = sessionStorage.getItem('teamId') !== null
                        && sessionStorage.getItem('teamId') !== 'undefined';
                    context.teams = teams;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs')
                    })
                }).catch(auth.handleError)
        }

        //CREATE TEAM
        this.get('#/create', function () {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username')
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs')
            }).catch(auth.handleError)
        })

        this.post('#/create', function (context) {
            let name = this.params.name;
            let comment = this.params.comment;

            teamsService.createTeam(name, comment)
                .then(function (team) {
                    teamsService.joinTeam(team._id)
                        .then(function (userInfo) {
                            auth.saveSession(userInfo)
                            auth.showInfo(`Team "${name}" created!`)
                            displayCatalog(context)
                        }).catch(auth.handleError)
                }).catch(auth.handleError)
        })

        //SHOW TEAM DETAILS
        this.get('#/catalog/:id', function (context) {
            let id = this.params.id.substring(1);
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username')
            teamsService.loadTeamDetails(id)
                .then(function (team) {
                    context.isAuthor = team._acl.creator === sessionStorage.getItem('userId')
                    context.isOnTeam = sessionStorage.getItem('teamId') === team._id;
                    context.teamId = id;
                    context.name = team.name;
                    context.comment = team.comment;
                    context.members = team.members;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs',
                        teamMember: './templates/catalog/teamMember.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs')
                    })
                }).catch(auth.handleError)

        })

        //LEAVE TEAM
        this.get('#/leave', function (context) {
            teamsService.leaveTeam()
                .then(function (userInfo) {
                    auth.saveSession(userInfo)
                    auth.showInfo('Team has been left!')
                    displayCatalog(context)
                }).catch(auth.handleError)
        })

        //JOIN TEAM
        this.get('#/join/:id', function (context) {
            let id = this.params.id.substring(1);
            teamsService.joinTeam(id)
                .then(function (userInfo) {
                    auth.saveSession(userInfo)
                    auth.showInfo('Team has been joined!')
                    displayCatalog(context)
                }).catch(auth.handleError)
        })

        //EDIT TEAM
        this.get('#/edit/:id', function (context) {
            this.loggedIn = sessionStorage.getItem('authtoken') !== null;
            this.username = sessionStorage.getItem('username')
            let id = this.params.id.substring(1);
            teamsService.loadTeamDetails(id)
                .then(function (team) {
                    context.teamId = id;
                    context.name = team.name;
                    context.comment = team.comment;

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs',
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs')
                    })
                }).catch(auth.handleError)
        })

        this.post('#/edit/:id', function (context) {
            let id = this.params.id.substring(1);
            let name = this.params.name;
            let comment = this.params.comment;
            teamsService.edit(id, name, comment)
                .then(function () {
                    auth.showInfo(`${name} was successfully edited!`)
                    displayCatalog(context)
                })
        })

    });

    app.run();
});