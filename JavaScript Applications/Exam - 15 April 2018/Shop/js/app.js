let handlers = {}

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs')

        this.get('index.html', handlers.displayWelcomePage)
        this.get('#/home', handlers.displayWelcomePage)

        this.post('#/register', handlers.registerUser)
        this.post('#/login', handlers.loginUser)
        this.get('#/logout', handlers.logoutUser)

        this.get('#/editor', handlers.displayActiveReceipt)
        this.post('#/entry/create', handlers.createEntry)
        this.get('#/entry/delete/:entryId', handlers.removeEntry)
        this.post('#/checkout', handlers.checkout)
        this.get('#/overview', handlers.getMyReceipts)
        this.get('#/details/:receiptId',handlers.details)
    })
    app.run()
})
