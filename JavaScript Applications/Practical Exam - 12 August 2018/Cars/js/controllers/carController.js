const carController = (() => {
    function getAllCars() {
        let endpoint = `cars?query={}&sort={"_kmd.ect": -1}`
        return request.get('appdata', endpoint, 'kinvey')
    }

    function create(brand, description, fuel, imageUrl, model, price, seller, title, year) {
        let data = {brand, description, fuel, imageUrl, model, price, seller, title, year}
        return request.post('appdata', 'cars', 'kinvey', data)
    }

    function edit(carId, brand, description, fuel, imageUrl, model, price, seller, title, year) {
        let data = {brand, description, fuel, imageUrl, model, price, seller, title, year}
        let endpoint = `cars/${carId}`
        return request.update('appdata', endpoint, 'kinvey', data)
    }

    function remove(carId) {
        let endpoint = `cars/${carId}`
        return request.remove('appdata', endpoint, 'kinvey')
    }

    function getByUsername(username) {
        let endpoint=`cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`;
        return request.get('appdata',endpoint,'kinvey')
    }

    function getById(carId) {
        let endpoint='cars/'+carId
        return request.get('appdata',endpoint,'kinvey')
    }
    return {
        getAllCars,
        create,
        edit,
        remove,
        getByUsername,
        getById
    }
})()