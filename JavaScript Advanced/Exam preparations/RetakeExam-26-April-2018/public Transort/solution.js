class PublicTransportTable {
    constructor(town) {
        this.town = town;
        this.changeTownName();
        this.searchButton();
        this.clearButton();
    }

    changeTownName() {
        $('table caption').text(`${this.town}'s Public Transport`)
    }

    addVehicle(obj) {
        let table = $('.vehicles-info');
        let type = obj.type;
        let name = obj.name;
        let tr = $('<tr>')
            .append($(`<td>${type}</td>`))
            .append($(`<td>${name}</td>`));
        let button = $(`<button>More Info</button>`)

        let innerTr = $('<tr class="more-info">')
        let innerTd = $('<td colspan="3">')
        let innerTable = $('<table>')
        innerTable.append($(`<tr><td>Route: ${obj.route}</td></tr>`))
            .append(`<tr><td>Price: ${obj.price}</td></tr>`)
            .append(`<tr><td>Driver: ${obj.driver}</td></tr>`);
        innerTd.append(innerTable);
        innerTr.append(innerTd);

        button.on('click', function () {
            if ($(this).text() === 'More Info') {
                innerTr.insertAfter(tr);
                $(this).text('Less Info')
            } else {
                innerTr.remove();
                $(this).text('More Info')
            }
        })
        let buttonTd = $('<td>')
            .append(button);
        tr.append(buttonTd);
        table.append(tr);
    }

    searchButton() {
        $('.search-btn').on('click', function () {
            let typeInput = $('input[name="type"]');
            let nameInput = $('input[name="name"]');
            let type = typeInput.val();
            let name = nameInput.val();

            if (type || name) {
                let rows = $('.vehicles-info > tr').not('.more-info');

                for (let i = 0; i < rows.length; i++) {
                    let currentType = $(rows[i].children[0]).text();
                    let currentName = $(rows[i].children[1]).text();
                    if (!currentType.includes(type) || !currentName.includes(name)) {
                        $(rows[i]).css('display', 'none')
                        let button = $(rows[i]).find('td').eq(2).find('button')
                        if (button.text() === 'Less Info') {
                            button.click();
                        }

                    } else {
                        $(rows[i]).css('display', '')
                    }
                }
            }
        })
    }

    clearButton() {
        $('.clear-btn').on('click', function () {
            let rows = $('.vehicles-info > tr');
            for (let i = 0; i < rows.length; i++) {
                $(rows[i]).css('display', '')
            }

            $('input[name="type"]').val('');
            $('input[name="name"]').val('');
        })
    }
}