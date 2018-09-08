$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs')

        this.get('#/home', displayWelcomePage)
        this.get('index.html', displayWelcomePage)

        this.post('#/register', function (context) {
            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPass;

            if (validateData(username, password, repeatPassword)) {
                if (password !== repeatPassword) {
                    notification.showError('Both passwords should match.')
                    return;
                }
                user.register(username, password)
                    .then(function (userInfo) {
                        user.saveUserSession(userInfo);
                        notification.showInfo('User registration successful')
                        $('#registerForm').trigger('reset')
                        context.redirect('#/catalog')
                    }).catch(notification.handleError)
            }
        })

        this.post('#/login', function (context) {
            let username = context.params.username;
            let password = context.params.password;

            if (validateData(username, password)) {
                user.login(username, password)
                    .then(function (userInfo) {
                        user.saveUserSession(userInfo);
                        notification.showInfo('User login successful')
                        $('#loginForm').trigger('reset')
                        context.redirect('#/catalog')
                    }).catch(notification.handleError)
            }
        })
        this.get('#/logout', function () {
            user.logout()
                .then(() => {
                    sessionStorage.clear()
                    notification.showInfo('Logout successful.');
                    this.redirect('#/home')
                }).catch(notification.handleError)
        })

        this.get('#/catalog', function (context) {
            if (!user.isAuth()) {
                this.redirect('#/home')
                return;
            }

            posts.listAllPosts()
                .then(function (allPosts) {
                    allPosts.forEach((post, index) => {
                        post.rank = index + 1;
                        post.passedTime = calcTime(post._kmd.ect);
                        post.isAuthor = post._acl.creator === sessionStorage.getItem('userId')
                    })
                    context.isAuth = user.isAuth();
                    context.username = sessionStorage.getItem('username')
                    context.posts = allPosts;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        post: './templates/catalog/post.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/catalog.hbs')
                    })
                }).catch(notification.handleError)
        })

        this.get('#/create/post', function () {
            if (!user.isAuth()) {
                this.redirect('#/home')
                return;
            }
            this.isAuth = user.isAuth();
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/catalog/createPost.hbs')
            })
        })
        this.post('#/create/post', function (context) {
            let url = context.params.url;
            let title = context.params.title;
            let imageUrl = context.params.image;
            let description = context.params.comment;
            let author = sessionStorage.getItem('username')

            if (postIsValid(title, url)) {
                posts.createPost(author, title, description, url, imageUrl)
                    .then(function () {
                        notification.showInfo('Post created!')
                        $('#submitForm').trigger('reset')
                        context.redirect('#/catalog')
                    }).catch(notification.handleError)
            }
        })

        this.get('#/post/edit/:postId', function (context) {
            if (!user.isAuth()) {
                this.redirect('#/home')
                return;
            }
            this.isAuth = user.isAuth();
            this.username = sessionStorage.getItem('username');

            let postId = this.params.postId;
            posts.getPostById(postId)
                .then(function (post) {
                    context.post = post;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/editPost.hbs')
                    })
                }).catch(notification.handleError)
        })

        this.post('#/post/edit/:postId', function (context) {
            let url = context.params.url;
            let title = context.params.title;
            let imageUrl = context.params.image;
            let description = context.params.comment;
            let postId = context.params.postId;
            let author = sessionStorage.getItem('username')
            if (postIsValid(title, url)) {
                posts.editPost(postId, author, title, description, url, imageUrl)
                    .then(function () {
                        notification.showInfo(`Post ${title} updated!`)
                        $('#submitForm').trigger('reset')
                        context.redirect('#/catalog')
                    }).catch(notification.handleError)
            }
        })

        this.get('#/post/delete/:postId', function (context) {
            if (!user.isAuth()) {
                ctx.redirect('#/home');
                return;
            }
            let postId = context.params.postId;
            posts.deletePost(postId)
                .then(function () {
                    notification.showInfo('Post deleted!')
                    context.redirect('#/catalog')
                }).catch(notification.handleError)
        })

        this.get('#/myPosts', function (context) {
            if (!user.isAuth()) {
                this.redirect('#/home')
                return;
            }
            let username = sessionStorage.getItem('username')
            posts.listMyPosts(username)
                .then(function (allPosts) {
                    allPosts.forEach((post, index) => {
                        post.rank = index + 1;
                        post.passedTime = calcTime(post._kmd.ect);
                        post.isAuthor = post._acl.creator === sessionStorage.getItem('userId')
                    })
                    context.isAuth = user.isAuth();
                    context.username = sessionStorage.getItem('username')
                    context.posts = allPosts;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        post: './templates/catalog/post.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/myPosts.hbs')
                    })
                }).catch(notification.handleError)
        })

        this.get('#/details/:postId', function (context) {
            let postId = context.params.postId;

            const postPromise = posts.getPostById(postId);
            const commentsPromise = comments.getAllComments(postId);

            Promise.all([postPromise, commentsPromise])
                .then(function ([post, comments]) {
                    context.isAuth = user.isAuth()
                    context.username = sessionStorage.getItem('username')
                    post.passedTime = calcTime(post._kmd.ect)
                    context.post = post;
                    context.isAuthor = post._acl.creator === sessionStorage.getItem('userId')

                    comments.forEach((comment) => {
                        comment.passedTime = calcTime(comment._kmd.ect)
                        comment.isCommentAuthor = comment._acl.creator === sessionStorage.getItem('userId')
                    })
                    context.comments = comments;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        comment: './templates/catalog/comment.hbs',
                        commentForm: './templates/forms/commentForm.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs')
                    })
                }).catch(notification.handleError)
        })

        this.post('#/create/comment', function (context) {
            let author = sessionStorage.getItem('username')
            let postId = context.params.postId;
            let content = context.params.content;

            if(content===""){
                notification.showError('Comment content is required!')
            }
            comments.createComment(postId, content, author)
                .then(function () {
                    notification.showInfo('Comment created!')
                    context.redirect('#/details/' + postId)
                    $('#commentForm').trigger('reset')
                }).catch(notification.handleError)
        })

        this.get('#/comment/delete/:commentId/post/:postId',function (context) {
            let commentId=this.params.commentId;
            let postId=this.params.postId;

            comments.deleteComment(commentId)
                .then(function () {
                    notification.showInfo('Comment deleted!')
                    context.redirect('#/details/'+postId)
                }).catch(notification.handleError)
        })
    })


    function displayWelcomePage(context) {
        context.isAuth = user.isAuth();
        if (user.isAuth()) {
            context.redirect('#/catalog')
        } else {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/home/welcomePage.hbs')
            })
        }
    }

    function validateData(username, password) {
        let usernamePattern = /^[A-Za-z]{3,}$/
        let passwordPattern = /^[A-Za-z0-9]{6,}$/

        if (!usernamePattern.test(username)) {
            notification.showError('A username should be at least 3 characters long and should contain only english alphabet letters.')
        } else if (!passwordPattern.test(password)) {
            notification.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        } else {
            return true
        }
        return false;
    }

    function postIsValid(title, url) {
        if (!url) {
            notification.showError('Url is required!')
        }
        else if (!url.startsWith('http')) {
            notification.showError('Url should start with "http" !')
        }
        else if (!title) {
            notification.showError('Title is required!')
        } else {
            return true;
        }
        return false;
    }

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    app.run()
})
