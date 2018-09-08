let receiptController = (() => {
    function getActiveReceipt() {
        let userId = sessionStorage.getItem('userId')
        const endpoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function create() {
        const data = {
            active: true,
            productsCount: 0,
            total: 0
        }
        return remote.post('appdata', 'receipts', 'kinvey', data)
    }

    function getMyReceipts() {
        let userId = sessionStorage.getItem('userId')
        const endpoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function getById(receiptId) {
        const endpoint = `receipts/${receiptId}`;
        return remote.get('appdata', endpoint, 'kinvey')
    }
    
    function checkout(receiptId,productsCount,total) {
        const endpoint = `receipts/${receiptId}`;
        let data={
            active:false,
            productsCount,
            total
        }

        return remote.update('appdata',endpoint,'kinvey',data)
    }

    return {
        getActiveReceipt,
        create,
        getMyReceipts,
        getById,
        checkout
    }
})()