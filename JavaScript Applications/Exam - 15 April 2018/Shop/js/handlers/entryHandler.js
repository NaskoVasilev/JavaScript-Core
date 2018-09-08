handlers.createEntry = function (context) {
    let type = context.params.type;
    let quantity = context.params.quantity;
    let price = context.params.price;
    let receiptId = context.params.receiptId;

    if (!type) {
        notify.showError('Product name must be non-empty string!')
    } else if (isNaN(+quantity) || quantity === "") {
        notify.showError('Quantity must be positive number!')
    } else if (isNaN(+price) || price === "") {
        notify.showError('Price must be positive number!')
    } else {
        entryController.create(type, quantity, price, receiptId)
            .then(()=>{
                notify.showInfo('Entry added!')
                context.redirect('#/editor')
            })
    }
}

handlers.removeEntry=function (context) {
    let id=context.params.entryId
    entryController.remove(id)
        .then(function () {
            notify.showInfo('Entry removed!')
            context.redirect('#/editor')
        })
}
