let entryController = (() => {
    function getAllEntriesByReceiptId(receiptId) {
        const endpoint = `entries?query={"receiptId":"${receiptId}"}`
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function create(type, quantity, price, receiptId) {
        const data = {type, price, quantity, receiptId}
        return remote.post('appdata', 'entries', 'kinvey', data)
    }

    function remove(entryId) {
        const endpoint='entries/'+entryId
        return remote.remove('appdata',endpoint,'kinvey')
    }

    return {
        getAllEntriesByReceiptId,
        create,
        remove
    }
})()
