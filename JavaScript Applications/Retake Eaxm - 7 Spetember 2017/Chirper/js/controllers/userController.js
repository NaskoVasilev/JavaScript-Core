let userController = (function () {
    function login(username, password) {
        let data = {username, password}
        return request.post('user', 'login', 'basic', data)
    }

    function register(username, password) {
        let subscriptions = []
        let data = {username, password, subscriptions}
        return request.post('user', '', 'basic', data)
    }

    function logout() {
        return request.post('user', '_logout', 'kinvey')
    }

    function getAllUsers() {
        return request.get('user', '', 'kinvey')
    }

    function unfollowUser(username) {
        let userId = sessionStorage.getItem('userId');
        let subscriptions=JSON.parse(sessionStorage.getItem('subscriptions'))
        let index = subscriptions.indexOf(username)
        subscriptions.splice(index, 1)
        return request.update('user', userId, 'kinvey', {subscriptions})
    }

    function followUser(username) {
        let userId = sessionStorage.getItem('userId');
        let subscriptions = []
        console.log(sessionStorage.getItem('subscriptions'))
        if (sessionStorage.getItem('subscriptions')!=='undefined') {
            subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
        }
        subscriptions.push(username);
        return request.update('user', userId, 'kinvey', {subscriptions})
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
        sessionStorage.setItem('username', userInfo.username)
        sessionStorage.setItem('userId', userInfo._id)
        sessionStorage.setItem('subscriptions', JSON.stringify(userInfo.subscriptions))
    }

    function saveSessionAndShowInfo(userInfo, message) {
        saveUserSession(userInfo)
        notification.showInfo(message)
    }

    function isAuth() {
        return sessionStorage.getItem('username') !== null;
    }

    return {
        register,
        login,
        logout,
        isAuth,
        saveUserSession,
        getAllUsers,
        followUser,
        unfollowUser,
        saveSessionAndShowInfo
    }

})()