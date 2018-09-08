let request = (function () {

    const appKey = 'kid_Syq3Sh0Dm'
    const appSecret = '42d451a2d943476ca4f774b778ef45ff'
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