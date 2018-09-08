let comments = (function () {

    function getAllComments(postId) {
        let endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`
        return request.get('appdata', endpoint, 'kinvey')
    }

    function createComment(postId, content, author) {
        let data = {postId, content, author}
        return request.post('appdata', 'comments', 'kinvey', data)
    }

    function deleteComment(commentId) {
        let endpoint = 'comments/' + commentId;
        return request.remove('appdata', endpoint, 'kinvey')
    }

    return {
        getAllComments,
        createComment,
        deleteComment
    }

})()