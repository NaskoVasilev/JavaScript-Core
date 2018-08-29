class PaymentManager {
    constructor(title) {
        this.title = title;
        this.table = this.createTable()
    }

    createTable() {
        let table = $('<table>')
            .append($(`<caption>${this.title} Payment Manager</caption>`))
            .append($('<thead>')
                .append($('<tr>')
                    .append($('<th class="name">Name</th>'))
                    .append($('<th class="category">Category</th>'))
                    .append($('<th class="price">Price</th>'))
                    .append($('<th>Actions</th>'))))

        let tbody = $('<tbody></tbody>')
        tbody.addClass('payments');

        let tfoot = $('<tfoot></tfoot>').addClass('input-data');

        tfoot.append($('<tr>')
            .append($('<td><input name="name" type="text"></td>'))
            .append($('<td><input name="category" type="text"></td>'))
            .append($('<td><input name="price" type="number"></td>')));

        let addBtn = $('<button>Add</button>');
        addBtn.on('click', function () {
            let nameInput = tfoot.find('input[name="name"]');
            let categoryInput = tfoot.find('input[name="category"]');
            let priceInput = tfoot.find('input[name="price"]');

            if (nameInput.val() !== "" && categoryInput.val() !== "" && priceInput.val() !== "") {
                let name = nameInput.val();
                let category = categoryInput.val();
                let price = Number(priceInput.val())
                let tr = $('<tr>')
                    .append($(`<td>${name}</td>`))
                    .append($(`<td>${category}</td>`))
                    .append($(`<td>${price}</td>`))
                let deleteBtn = $('<button>')
                deleteBtn.text('Delete')
                deleteBtn.on('click', function () {
                    tr.remove();
                })
                tr.append($('<td>').append(deleteBtn));
                tbody.append(tr);

                nameInput.val('')
                categoryInput.val('')
                priceInput.val('')
            }
        })
        $(tfoot.find('tr'))
            .append($('<td>').append(addBtn));
        table.append(tbody);
        table.append(tfoot)

        return table;
    }

    render(id) {
        $('#' + id).append(this.table)
    }
}
