handlers.listAllCars = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    context.username = sessionStorage.getItem('username')

    carController.getAllCars()
        .then((cars) => {
            cars.forEach(c => {
                c.isAuthor = c._acl.creator === sessionStorage.getItem('userId')
            })
            context.cars = cars;

            context.loadPartials({
                navigation: './templates/common/navigation.hbs',
                car: './templates/partials/car.hbs',
            }).then(function () {
                this.partial('./templates/carsListing.hbs')
            })
        }).catch(notify.handleError)
}

handlers.createCar = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    context.username = sessionStorage.getItem('username')

    context.loadPartials({
        navigation: './templates/common/navigation.hbs',
    }).then(function () {
        this.partial('./templates/forms/createCar.hbs')
    })
}

handlers.createCarAction = function (context) {
    let title = context.params.title;
    let description = context.params.description;
    let brand = context.params.brand;
    let model = context.params.model;
    let year = context.params.year;
    let imageUrl = context.params.imageUrl;
    let fuel = context.params.fuel;
    let price = context.params.price;
    let seller = sessionStorage.getItem('username')

    if (handlers.validateCarInput(title, description, brand, fuel, model, year, price, imageUrl)) {
        carController.create(brand, description, fuel, imageUrl, model, price, seller, title, year)
            .then(function () {
                notify.showInfo('New car created.')
                context.redirect('#/cars')
            }).catch(notify.handleError)
    }
}

handlers.editCar = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    let id = context.params.carId;
    context.username = sessionStorage.getItem('username')
    carController.getById(id)
        .then(function (car) {
            context.car = car;

            context.loadPartials({
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/forms/editForm.hbs')
            })
        }).catch(notify.handleError)
}

handlers.editCarAction = function (context) {
    let title = context.params.title;
    let description = context.params.description;
    let brand = context.params.brand;
    let model = context.params.model;
    let year = context.params.year;
    let imageUrl = context.params.imageUrl;
    let fuel = context.params.fuel;
    let price = context.params.price;
    let seller = sessionStorage.getItem('username')
    let carId = context.params.carId

    if (handlers.validateCarInput(title, description, brand, fuel, model, year, price, imageUrl)) {
        carController.edit(carId, brand, description, fuel, imageUrl, model, price, seller, title, year)
            .then(function () {
                notify.showInfo(`Listing ${title} updated.`)
                context.redirect('#/cars')
            }).catch(notify.handleError)
    }
}

handlers.deleteCar = function (context) {
    let carId = context.params.carId

    carController.remove(carId)
        .then(function () {
            notify.showInfo('Listing deleted.')
            context.redirect('#/cars')
        }).catch(notify.handleError)
}

handlers.listMyCars = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    let username = sessionStorage.getItem('username')
    context.username = username;
    carController.getByUsername(username)
        .then(function (cars) {
            context.cars = cars
            context.loadPartials({
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/myCars.hbs')
            })
        }).catch(notify.handleError)
}

handlers.details = function (context) {
    if (!userController.isAuth()) {
        context.redirect('#/login')
    }
    let username = sessionStorage.getItem('username')
    context.username = username;
    let carId = context.params.carId

    carController.getById(carId)
        .then(function (car) {
            context.car = car;
            context.loadPartials({
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/details.hbs')
            })
        }).catch(notify.handleError)
}

handlers.validateCarInput = function (title, description, brand, fuel, model, year, price, imageUrl) {
    if (title.length > 33) {
        notify.showError('Title cannot be more than 33 symbols!')
    } else if (description.length < 30 || description.length > 450) {
        notify.showError('Description cannot be more than 450 symbols and should be at least 30 symbols!')
    } else if (brand.length > 11) {
        notify.showError('Brand cannot be more than 11 symbols!')
    } else if (fuel.length > 11) {
        notify.showError('Fuel cannot be more than 11 symbols!')
    } else if (model.length > 11 || model.length < 4) {
        notify.showError('Model length should  be between 4 and 11 symbols!')
    } else if (year.length !== 4) {
        notify.showError('Year should be exactly 4 symbols!')
    } else if (+price > 1000000) {
        notify.showError('The maximum price is 1000000$.')
    } else if (!imageUrl.startsWith('http')) {
        notify.showError('Link url should always start with “http”.')
    } else {
        return true
    }

    return false
}