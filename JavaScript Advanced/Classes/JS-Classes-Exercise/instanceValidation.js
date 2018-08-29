class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName
        this.lastName = lastName;
        this.products = [];
    }

    set clientId(id) {
        let idPattern = /^\d{6}$/
        if (!idPattern.test(id)) {
            throw new TypeError('Client ID must be a 6-digit number')
        }
        this._clientId = id;
    }

    get clientId() {
        return this._clientId;
    }

    set email(email) {
        let emailPattern = /^\w+@[A-Za-z.]+$/
        if (!emailPattern.test(email)) {
            throw new TypeError('Invalid e-mail')
        }
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set firstName(firstName) {
        let firstNamePattern = /^[A-Za-z]+$/
        if (firstName.length >= 3 && firstName.length <= 20) {
            if (!firstNamePattern.test(firstName)) {
                throw new TypeError('First name must contain only Latin characters')
            }
            this._firstName = firstName;
        }
        else {
            throw new TypeError('First name must be between 3 and 20 characters long')
        }
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(lastName) {
        let lastNamePattern = /^[A-Za-z]+$/
        if (lastName.length >= 3 && lastName.length <= 20) {
            if (!lastNamePattern.test(lastName)) {
                throw new TypeError('Last name must contain only Latin characters')
            }
            this._lastName = lastName;
        }
        else {
            throw new TypeError('Last name must be between 3 and 20 characters long')
        }
    }

    get lastName() {
        return this._lastName;
    }
}

let account = new CheckingAccount('131114', 'ivan@some.com', 'Ivan', 'Petrov')
console.log(account);
//let account1 = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov')
//console.log(account1);

