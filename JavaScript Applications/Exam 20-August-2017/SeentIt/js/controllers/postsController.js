let posts = (function () {

    function listAllPosts() {
        let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}'
        return request.get('appdata', endpoint, 'kinvey')
    }

    function createPost(author, title, description, url, imageUrl) {
        let data = {author, title, description, url, imageUrl}
        return request.post('appdata','posts','kinvey',data)
    }
    
    function editPost(postId,author,title, description, url, imageUrl) {
        let data = {author,title, description, url, imageUrl}
        let endpoint='posts/'+postId
        return request.update('appdata',endpoint,'kinvey',data)
    }
    
    function deletePost(postId) {
        let endpoint='posts/'+postId
        return request.remove('appdata',endpoint,'kinvey')
    }

    function listMyPosts(username) {
        let endpoint=`posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`
        return request.get('appdata',endpoint,'kinvey')
    }
    
    function getPostById(postId) {
        let endpoint='posts/'+postId;
        return request.get('appdata',endpoint,'kinvey')
    }

    return {
        listAllPosts,
        createPost,
        editPost,
        deletePost,
        listMyPosts,
        getPostById
    }
    
})()