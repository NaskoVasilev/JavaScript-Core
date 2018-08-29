function calendar(arr) {
    let [day, month, year] = arr;
    let date = new Date(year, month - 1, day);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let monthName = monthNames[date.getMonth()];
    let divContent = $('#content')
    let table = $('<table></table>')
    let caption = $(`<caption>${monthName} ${year}</caption>`)
    let body = $('<tbody>')
    table.append(caption)
    table.append(body)

    body.append($('<tr>')
        .append($('<th>Mon</th>'))
        .append($('<th>Tue</th>'))
        .append($('<th>Wed</th>'))
        .append($('<th>Thu</th>'))
        .append($('<th>Fri</th>'))
        .append($('<th>Sat</th>'))
        .append($('<th>Sun</th>'))
    )

    let endDate = new Date(year, month, 0);
    let endDay = endDate.getDate();
    let startDate = new Date(year, month - 1, 1)
    let startDay = startDate.getDay()
    if (startDay === 0) {
        startDay = 7;
    }
    let end = endDay + startDay
    let counter = 0;
    let currentDay = 0;

    for (let row = 0; row < Math.ceil(end / 7); row++) {
        if (currentDay >= endDay) {
            break;
        }
        let tr = $('<tr>');
        for (let col = 0; col < 7; col++) {
            counter++;
            let td = $('<td></td>');

            if(currentDay<endDay) {
                if (counter >= startDay) {
                    currentDay++;
                    td.text(currentDay)
                }

                if (currentDay === day) {
                    td.addClass('today');
                }
            }
            tr.append(td);
        }
        body.append(tr);
    }

    divContent.append(table);
}

