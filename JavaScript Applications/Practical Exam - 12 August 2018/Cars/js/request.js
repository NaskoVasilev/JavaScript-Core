let request = (function () {

    const appKey = 'kid_r1lZr51dQ'
    const appSecret = '51773c27ec414edbb3e845bac203bb61'
    const baseUrl = 'https://baas.kinvey.com/';

    function getAuthentication(type) {
        if (type === 'basic') {
            return {'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret)}
        }
        return {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
    }

    function makeRequest(method, module, endpoint, auth) {
        return {
            method: method,
            url: baseUrl + module + '/' + appKey + '/' + endpoint,
            headers: getAuthentication(auth),
        }
    }

    function post(module, endpoint, auth, data) {
        let obj = makeRequest('POST', module, endpoint, auth)
        if(data){
            obj.data = data;
        }
        return $.ajax(obj)
    }

    function get(module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth))
    }

    function update(module, endpoint, auth, data) {
        let obj = makeRequest('PUT', module, endpoint, auth)
        obj.data = data;
        return $.ajax(obj)
    }

    function remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth))
    }

    return {
        post,
        get,
        update,
        remove
    }

})()