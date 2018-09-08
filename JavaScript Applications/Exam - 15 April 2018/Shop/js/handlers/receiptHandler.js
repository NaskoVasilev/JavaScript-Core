handlers.displayActiveReceipt = async function (context) {
    try {
        let entries = [];

        let [receipt] = await receiptController.getActiveReceipt();
        if (!receipt) {
            receipt = await receiptController.create();
        } else {
            entries = await entryController.getAllEntriesByReceiptId(receipt._id)
        }
        let total = 0;
        let productsCount = 0;
        entries.forEach(e => {
            let subtotal=Number(e.quantity) * Number(e.price)
            e.subtotal = subtotal.toFixed(2)
            total += Number(e.subtotal);
            productsCount++;
        })
        context.username = sessionStorage.getItem('username')
        context.entries = entries;
        context.receiptId = receipt._id;
        context.total = Number(total).toFixed(2)
        context.productsCount = productsCount;

        context.loadPartials({
            footer: './templates/common/footer.hbs',
            header: './templates/common/header.hbs',
            entryForm: './templates/forms/entryForm.hbs',
            checkoutFrom: './templates/forms/checkoutForm.hbs',
            entry: './templates/entry/entry.hbs',
        }).then(function () {
            this.partial('./templates/receipt/receiptView.hbs')
        })
    }catch(err){
        notify.handleError(err)
    }
}

handlers.checkout = function (context) {
    let receiptId = context.params.receiptId;
    let total = +context.params.total;
    let productsCount = +context.params.productsCount;
    if (productsCount === 0) {
        notify.showError('Cannot check out empty receipt!')
    } else {
        receiptController.checkout(receiptId, productsCount, total)
            .then(function () {
                notify.showInfo('Receipt checked out!')
                context.redirect('#/editor')
            }).catch(notify.handleError)
    }
}

handlers.getMyReceipts = function (context) {
    receiptController.getMyReceipts()
        .then((receipts) => {
            let totalMoney = 0;
            receipts.forEach(r => {
                r.creationDate = new Date(r._kmd.ect).toDateString()
                totalMoney += Number(r.total);
            })
            context.receipts = receipts;
            context.username = sessionStorage.getItem('username')
            context.totalMoney = totalMoney.toFixed(2)
            context.loadPartials({
                footer: './templates/common/footer.hbs',
                header: './templates/common/header.hbs',
                receipt: './templates/receipt/receipt.hbs',
            }).then(function () {
                this.partial('./templates/receipt/overview.hbs')
            })
        })
}

handlers.details = function (context) {
    let id = context.params.receiptId;
    entryController.getAllEntriesByReceiptId(id)
        .then((entries) => {
            context.username = sessionStorage.getItem('username')
            entries.forEach(e=>{
                let total=Number(e.price)*Number(e.quantity)
                e.total=total.toFixed(2)
            })
            context.entries=entries;
            context.loadPartials({
                footer: './templates/common/footer.hbs',
                header: './templates/common/header.hbs',
            }).then(function () {
                this.partial('./templates/receipt/details.hbs')
            })
        }).catch(notify.handleError)
}