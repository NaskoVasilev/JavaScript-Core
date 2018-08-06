function sortUsernames(usernames) {
    let uniqueUsernames=new Set(usernames);

    [...uniqueUsernames].sort((a,b)=>
    {
        let diff=a.length-b.length;

        if(diff===0){
            return a.localeCompare(b);
        }
        return diff;
    }).forEach(username=>console.log(username));
}

sortUsernames(
    [
        'Ashton',
        'Kutcher',
        'Ariel',
        'Lilly',
        'Keyden',
        'Aizen',
        'Billy',
        'Billy',
        'Braston',
    ]

)