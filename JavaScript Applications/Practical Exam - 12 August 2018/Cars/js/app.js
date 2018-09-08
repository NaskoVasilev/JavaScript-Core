const handlers={}

$(()=>{
    const app = Sammy('#container',function () {
        this.use('Handlebars','hbs')

        this.get('#/home',handlers.displayHomeView)
        this.get('index.html',handlers.displayHomeView)

        this.get('#/register',handlers.register)
        this.post('#/register',handlers.registerAction)

        this.get('#/login',handlers.login)
        this.post('#/login',handlers.loginAction)
        this.get('#/logout',handlers.logout)

        this.get('#/cars',handlers.listAllCars)
        this.get('#/car/create',handlers.createCar)
        this.post('#/car/create',handlers.createCarAction)
        this.get('#/car/edit/:carId',handlers.editCar)
        this.post('#/car/edit/:carId',handlers.editCarAction)
        this.get('#/car/delete/:carId',handlers.deleteCar)
        this.get('#/myCars',handlers.listMyCars)
        this.get('#/details/:carId',handlers.details)


    })
    app.run()
})