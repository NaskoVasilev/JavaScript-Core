function initializeTable() {
    $('#createLink').on('click', createCountry);
    addCountryToTable('Bulgaria', 'Sofia');
    addCountryToTable('Germany', 'Berlin');
    addCountryToTable('Russia', 'Moscow');
    fixRowLinks();

    function createCountry() {
        let country=$('#newCountryText');
        let capital=$('#newCapitalText');
        addCountryToTable(country.val(),capital.val(),true);
        country.val("");
        capital.val("");
    }

    function addCountryToTable(country,capital) {
        let row=$('<tr>')
            .append($('<td>').text(country))
            .append($('<td>').text(capital))
            .append($('<td>')
                .append($('<a href="#">[Up]</a>').on('click',moveRowUp))
            .append($('<a href="#">[Down]</a>').on('click',moveRowDown))
            .append($('<a href="#">[Delete]</a>').on('click',deleteRow)))

        row.css('display','none')
        $('#countriesTable').append(row);
        row.fadeIn();
    }

    function moveRowUp() {
        let row=$(this).parent().parent();
        row.fadeOut(function () {
            row.insertBefore(row.prev());
            row.fadeIn();
            fixRowLinks();
        })
    }

    function moveRowDown() {
        let row=$(this).parent().parent();
        row.fadeOut(function () {
            row.insertAfter(row.next());
            row.fadeIn();
            fixRowLinks();
        })
    }

    function deleteRow() {
        let row=$(this).parent().parent();
        row.fadeOut(function () {
            row.remove();
            fixRowLinks()
        })
    }

    function fixRowLinks() {
        $('#countriesTable a').css('display','inline');
        let rows=$('#countriesTable tr');
        $(rows[2]).find("a:contains('Up')").css('display','none');
        $(rows[rows.length-1]).find("a:contains('Down')").css('display','none');

    }
}