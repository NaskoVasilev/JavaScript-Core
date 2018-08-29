function addSticker() {
    let container = $('#sticker-list')
    let titleInput = $('.title');
    let contentInput = $('.content');
    let title = titleInput.val();
    let content = contentInput.val();

    if (title !== "" && content !== "") {
        let li = $('<li>').addClass('note-content')
        container.append(li);
        let closeBtn = $('<a class="button">x</a>')
        closeBtn.on('click', function () {
            li.remove();
        })
        li.append(closeBtn)
            .append($(`<h2>${title}</h2>`))
            .append('<hr>')
            .append($(`<p>${content}</p>`))

        titleInput.val('');
        contentInput.val('');
    }
}