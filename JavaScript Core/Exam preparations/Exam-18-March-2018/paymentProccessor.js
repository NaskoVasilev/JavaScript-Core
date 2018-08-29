class PaymentProcessor {
    constructor(obj) {
        this.types = ["service", "product", "other"];
        this.precision = 2;
        if (obj !== undefined) {
            this.setOptions(obj)
        }
        this.balance = 0;
        this.payments = [];
    }

    registerPayment(id, name, type, value) {
        let idNotExists = true;
        for (const payment of this.payments) {
            if (payment.id === id) {
                idNotExists = false;
            }
        }
        if (this.types.includes(type)
            && typeof id === 'string'
            && id !== ""
            && typeof name === 'string'
            && name !== ""
            && typeof value === 'number'
            && idNotExists) {
            value = Number(value.toFixed(this.precision))
            let payment = {id, name, type, value}
            this.payments.push(payment);
            this.balance += value;
        } else {
            throw  new Error('Invalid parameter')
        }
    }

    deletePayment(id) {
        let idExists = false;
        for (let i = 0; i < this.payments.length; i++) {
            if (this.payments[i].id === id) {
                idExists = true;
                this.balance -= this.payments[i].value;
                this.payments.splice(i, 1);
                break;
            }
        }
        if (!idExists) {
            throw  new Error('Id does not exist')
        }
    }

    get(id) {
        for (const payment of this.payments) {
            if (payment.id === id) {
                return `Details about payment ID: ${id}\n` +
                    `- Name: ${payment.name}\n` +
                    `- Type: ${payment.type}\n` +
                    `- Value: ${payment.value.toFixed(this.precision)}`
            }
        }
            throw  new Error('Id does not exist')
    }

    setOptions(options) {
        if (options.hasOwnProperty('types')) {
            this.types = options.types;
        }
        if (options.hasOwnProperty('precision')) {
            this.precision = options.precision
        }
    }

    toString() {
        return 'Summary:\n' +
            `- Payments: ${this.payments.length}\n` +
            `- Balance: ${this.balance.toFixed(this.precision)}\n`
    }

}

const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());


