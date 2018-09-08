let profileController=(function () {
    function countChirps(username) {
        let endpoint=`chirps?query={"author":"${username}"}`
        return request.get('appdata',endpoint,'kinvey')
    }
    
    function countFollowingUsers(username) {
        let endpoint=`?query={"username":"${username}"}`
        return request.get('user',endpoint,'kinvey')
    }
    
    function countFollowers(username) {
        let endpoint=`?query={"subscriptions":"${username}"}`
        return request.get('user',endpoint,'kinvey')
    }

    return{
        countChirps,
        countFollowers,
        countFollowingUsers
    }
})()