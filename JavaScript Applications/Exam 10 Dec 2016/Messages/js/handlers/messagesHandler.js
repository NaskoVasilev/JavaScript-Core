handlers.listMyMessages = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    let recipientUsername = sessionStorage.getItem('username')
    messagesController.getMessagesByRecipient(recipientUsername)
        .then((messages) => {
            messages.forEach(m => {
                m.sender = messagesController.formatSender(m.sender_name, m.sender_username)
                m.date = messagesController.formatDate(m._kmd.lmt)
            })
            context.messages = messages;
            context.username = recipientUsername;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                message: './templates/partials/message.hbs'
            }).then(function () {
                this.partial('./templates/myMessages.hbs')
            })
        }).catch(notify.handleError)
}

handlers.archive = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }

    let senderUsername = sessionStorage.getItem('username')
    messagesController.getMessagesBySender(senderUsername)
        .then(function (messages) {
            messages.forEach(m => {
                m.date = messagesController.formatDate(m._kmd.lmt)
            })

            context.username = senderUsername
            context.messages = messages;
            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                myMessage: './templates/partials/myMessage.hbs',
            }).then(function () {
                this.partial('./templates/archive.hbs')
            })
        }).catch(notify.handleError)
}

handlers.deleteMessage = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    let messageId = context.params.messageId;
    messagesController.deleteMessage(messageId)
        .then(function () {
            notify.showInfo('Message deleted.')
            context.redirect('#/archive')
        }).catch(notify.handleError)
}

handlers.loadSendMessageForm = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    messagesController.getAllUsers()
        .then(function (users) {
            context.username = sessionStorage.getItem('username')
            context.users = users;
            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/forms/sendMessage.hbs')
            })
        })
}

handlers.sendMessage = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    let text = context.params.text;
    let recipient_username = context.params.recipient;
    let sender_username = sessionStorage.getItem('username')
    let sender_name = sessionStorage.getItem('name')

    messagesController.sendMessage(sender_username, sender_name, recipient_username, text)
        .then(() => {
            notify.showInfo('Message sent.')
            context.redirect('#/archive')
        }).catch(notify.handleError)
}