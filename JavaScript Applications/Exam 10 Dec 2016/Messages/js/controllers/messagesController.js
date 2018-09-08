let messagesController = (() => {

    function getMessagesByRecipient(recipientUsername) {
        let endpoint = `messages?query={"recipient_username":"${recipientUsername}"}`
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function getMessagesBySender(senderUsername) {
        let endpoint = `messages?query={"sender_username":"${senderUsername}"}`
        return remote.get('appdata', endpoint, 'kinvey')
    }
    
    function getAllUsers() {
        return remote.get('user',"",'kinvey')
    }
    
    function sendMessage(sender_username,sender_name,recipient_username,text) {
        const data={sender_username,sender_name,recipient_username,text}

        return remote.post('appdata','messages','kinvey',data)
    }

    function deleteMessage(messageId) {
        const endpoint=`messages/${messageId}`

        return remote.remove('appdata',endpoint,'kinvey')
    }

    function formatDate(dateISO8601) {
        let date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate()))
            return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
            "." + date.getFullYear() + ' ' + date.getHours() + ':' +
            padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }

    function formatSender(name, username) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    }


    return {
        getMessagesByRecipient,
        getMessagesBySender,
        getAllUsers,
        sendMessage,
        formatDate,
        formatSender,
        deleteMessage
    }
})()