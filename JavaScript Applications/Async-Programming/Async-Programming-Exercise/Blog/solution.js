function attachEvents() {
    const appId = 'kid_BJq1DKgvX';
    const url = "https://baas.kinvey.com/appdata/" + appId;
    const username = 'peter';
    const password = 'p';
    const base64 = btoa(username + ':' + password);
    const authHeaders = {'Authorization': 'Basic ' + base64};
    const options = $('#posts');
    const postTitle=$('#post-title')
    const body=$('#post-body')
    const list=$('#post-comments')

    $('#btnLoadPosts').on('click', loadPosts)
    $('#btnViewPost').on('click', viewPost)

    function loadPosts() {
        $.ajax({
            method: 'GET',
            url: url + '/posts',
            headers: authHeaders
        }).then(displayPosts)
            .catch(displayError)
    }

    function viewPost() {
        let selectedPostId=options.val()
        if(!selectedPostId)return;
        let requestPosts=$.ajax({
            method:'GET',
            url:url+'/posts/'+selectedPostId,
            headers:authHeaders
        })
        let requestComments=$.ajax({
            method:"GET",
            url:url+'/comments/'+`?query={"post_id":"${selectedPostId}"}`,
            headers:authHeaders
        })

        Promise.all([requestPosts,requestComments])
            .then(displayPostWithComments)
            .catch(displayError)
    }

    function displayPostWithComments([post,comments]){
        postTitle.text(post.title)
        body.text(post.body)
        list.empty()

        for (const comment of comments) {
            let li=$('<li>').text(comment.text)
            list.append(li)
        }
    }

    function displayPosts(posts) {
        options.empty();
        for (const post of posts) {
            let option = $('<option>')
                .text(post.title)
                .val(post._id)
            options.append(option)
        }
    }

    function displayError(error) {
        let errorDiv = $('<div>')
            .text(`Error: ${error.status} (${error.statusText})`);

        $(document.body).prepend(errorDiv);
        setTimeout(function () {
            $(errorDiv).fadeOut(function () {
                errorDiv.remove()
            })
        }, 3000);
    }

}