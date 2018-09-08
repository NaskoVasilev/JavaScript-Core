chirpsController = (function () {
    function listChirpsFromSubscriptions() {
            let endpoint = `chirps?query={}&sort={"_kmd.ect": 1}`
            return request.get('appdata', endpoint, 'kinvey')
    }

    function create(text) {
        let author = sessionStorage.getItem('username')
        let data = {text, author}
        return request.post('appdata', 'chirps', 'kinvey',data)
    }

    function deleteChirp(id) {
        let endpoint = `chirps/${id}`
        return request.remove('appdata', endpoint, 'kinvey')
    }

    function getMyChirps(username) {
        let endpoint = `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`
        return request.get('appdata', endpoint, 'kinvey')
    }

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }


    return {
        listChirpsFromSubscriptions,
        create,
        deleteChirp,
        getMyChirps,
        calcTime
    }
})()