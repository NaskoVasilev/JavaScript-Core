function posts(){
    class Post{
        constructor(title,content){
            this.title=title;
            this.content=content;
        }
        toString(){
            let output=`Post: ${this.title}\nContent: ${this.content}`
            return output;
        }
    }

    class SocialMediaPost extends Post{
        constructor(title,content,likes,dislikes){
            super(title,content)
            this.likes=Number(likes);
            this.dislikes=Number(dislikes);
            this.comments=[];
        }
        addComment(comment){
            this.comments.push(comment);
        }
        toString(){
            let output=super.toString();
            output+=`\nRating: ${this.likes-this.dislikes}`;
            if(this.comments.length>0){
                output+=`\nComments:`
                for (const comment of this.comments) {
                    output+=`\n* ${comment}`
                }
            }
            return output
        }
    }

    class BlogPost extends Post{
        constructor(title,content,views){
            super(title,content);
            this.views=views;
        }
        view(){
            this.views++;
            return this;
        }
        toString(){
            let output=super.toString();
            output+=`\nViews: ${this.views}`
            return output
        }
    }

    return {Post,SocialMediaPost,BlogPost}
}

//outputs
let result=posts()
let Post=result.Post;
let SocialMediaPost=result.SocialMediaPost;
let BlogPost=result.BlogPost;
let post = new Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!

let blogPost=new BlogPost("TestTitle", "TestContent");
blogPost.view()
    .view()
    .view()
    .view()
    .view()
console.log(blogPost.views);
console.log(blogPost.toString())

