const handlers={}

$(()=>{
    const app =Sammy('#app',function () {
        this.use('Handlebars','hbs')

        this.get('#/home',handlers.displayHomeView)
        this.get('messages.html',handlers.displayHomeView)

        this.get('#/register',handlers.register)
        this.post('#/register',handlers.registerAction)
        this.get('#/login',handlers.login)
        this.post('#/login',handlers.loginAction)
        this.get('#/logout',handlers.logout)

        this.get('#/myMessages',handlers.listMyMessages)
        this.get('#/archive',handlers.archive)
        this.get('#/message/delete/:messageId',handlers.deleteMessage)
        this.get('#/send',handlers.loadSendMessageForm)
        this.post('#/send',handlers.sendMessage)

    })
    app.run()
})