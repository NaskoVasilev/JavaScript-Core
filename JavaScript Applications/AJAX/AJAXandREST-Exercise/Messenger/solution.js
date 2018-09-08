function attachEvents() {
    let allMessages = $('#messages')
    const url = 'https://messenger-7aa48.firebaseio.com/messages.json';
    $('#refresh').on('click', function () {
        allMessages.empty();
        $.ajax({
            method: 'GET',
            url: url
        }).then(displayMessages)
            .catch(displayError)
    })

    function displayMessages(messages) {
        let output = [];
        let keys = Object.keys(messages)
        keys.sort((a, b) => {
            return Number(messages[a].timestamps) - Number(messages[b].timestamps);
        })
        for (const key of keys) {
            output.push(`${messages[key].author}: ${messages[key].content}`)
        }
        allMessages.text(output.join('\n'))
    }

    function displayError() {
        allMessages.text('Error')
    }

    $('#submit').on('click', function () {
        let authorInput = $('#author')
        let contentInput = $('#content')
        let author = authorInput.val();
        let content = contentInput.val();

        if (authorInput !== "" && contentInput !== "") {
            $.ajax({
                method: "POST",
                url: url,
                data: JSON.stringify({
                    author: author,
                    content: content,
                    timestamps: Date.now()
                })
            }).then(() => {
                $('#refresh').click();
            })
                .catch(displayError)

            contentInput.val('')
            authorInput.val('')
        }
    })
}