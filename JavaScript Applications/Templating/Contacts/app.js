(async () => {
    let contactsHtml = await $.get('./templates/contacts.hbs')
    let contactTemplate = Handlebars.compile(contactsHtml)
    let data = await $.get('./data.json')
    let html = contactTemplate({contacts: data})
    let contactDiv = $('#list');
    contactDiv.empty()
    contactDiv.append(html)

    let nameInfoHtml = await $.get('./templates/partials/nameInfo.hbs')
    let contactInfoHtml = await $.get('./templates/partials/contactInfo.hbs')
    Handlebars.registerPartial('nameInfo', nameInfoHtml)
    Handlebars.registerPartial('contactInfo', contactInfoHtml)
    let detailsHtml = await $.get('./templates/details.hbs')
    let detailsTemplate = Handlebars.compile(detailsHtml);

    $(".contact").on('click', function () {
        $(".contact").removeClass('highlightContact')
        $(this).addClass('highlightContact')
        let index = $(this).attr('data-id')
        let detailsInfo = detailsTemplate(data[index])
        $('#details > div').remove()
        $("#details").append(detailsInfo)
    })
})();