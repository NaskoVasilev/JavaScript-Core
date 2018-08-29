function solution(command) {
    if(command==='upvote'){
        this.upvotes++;
    }
    else if(command==='downvote'){
        this.downvotes++;
    }
    else if(command==='score'){
        let totalScore=this.upvotes-this.downvotes;
        let totalVotes=this.upvotes+this.downvotes;
        let reportedUpvotes=this.upvotes;
        let reportedDownvotes=this.downvotes;
        let rating="";
        if(totalVotes>50){
            let maxVotes=Math.max(this.upvotes,this.downvotes)
            reportedUpvotes=reportedUpvotes+Math.ceil(maxVotes*0.25)
            reportedDownvotes=reportedDownvotes+Math.ceil(maxVotes*0.25)
        }
        let noRating=true;

        if(this.upvotes/totalVotes>0.66){
            rating='hot';
            noRating=false;
        }
        else if(totalScore>=0&&(this.upvotes>100||this.downvotes>100)){
            rating='controversial';
            noRating=false;
        }else if(totalScore<0){
            rating='unpopular';
            noRating=false;
        }

        if(totalVotes<10||noRating){
            rating='new';
        }
        let result=[reportedUpvotes,reportedDownvotes,totalScore,rating]
        return result


    }
}


let forumPost = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};

solution.call(forumPost, 'upvote');
solution.call(forumPost, 'downvote');


for (let i = 0; i < 50; i++) {
    solution.call(forumPost, 'downvote')
}
let answer = solution.call(forumPost, 'score');



