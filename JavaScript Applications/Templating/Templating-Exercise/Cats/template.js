$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let catsHtml = $('#render-cats').html();
        let template = Handlebars.compile(catsHtml);
        let html = template({cats: window.cats})
        $(document.body).append(html)
    }

    $('.btn-primary').click(function () {
        let button = $(this)
        if (button.text() === 'Show status code') {
            button.text('Hide status code')
        } else {
            button.text('Show status code')
        }
        button.next().toggle();
    })
})
