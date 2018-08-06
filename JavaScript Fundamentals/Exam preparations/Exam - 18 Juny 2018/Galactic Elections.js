function storeVotes(inputLines) {
    let starSystems={};
    let allVotes={};
    let winners={};

    for (const line of inputLines) {
        let systemName=line["system"];
        let candidate=line["candidate"];
        let votes=line["votes"];

        if(!starSystems.hasOwnProperty(systemName)){
            starSystems[systemName]={};
            starSystems[systemName][candidate]=votes;
            allVotes[systemName]=votes;
        }
        else{
            allVotes[systemName]+=votes;
            if(!starSystems[systemName].hasOwnProperty(candidate)){
                starSystems[systemName][candidate]=votes;
            }
            else{
                starSystems[systemName][candidate]+=votes
            }
        }
    }

    let keys=Object.keys(starSystems);
    for (const key of keys) {
        let innerKeys=Object.keys(starSystems[key]).sort((a,b)=>{
            return starSystems[key][b]-starSystems[key][a];
        })
        winners[key]={};
        winners[key][innerKeys[0]]=allVotes[key];
    }

    let candidateVotes={};
    let total=0;
    for (const winnerKey in winners) {
        for (const candidate in winners[winnerKey]) {
            if(!candidateVotes.hasOwnProperty(candidate)){
                candidateVotes[candidate]=0;
            }
            candidateVotes[candidate]+=winners[winnerKey][candidate];
            total+=winners[winnerKey][candidate];
        }
    }

    let sortedCandidates=Object.keys(candidateVotes).sort((a,b)=>{
        return candidateVotes[b]-candidateVotes[a];
    })
    let halfVotes=total/2;
    if(sortedCandidates.length===1)
    {
        console.log(`${sortedCandidates[0]} wins with ${candidateVotes[sortedCandidates[0]]} votes`)
        console.log(`${sortedCandidates[0]} wins unopposed!`)
    }
    else if(candidateVotes[sortedCandidates[0]]>halfVotes){
        console.log(`${sortedCandidates[0]} wins with ${candidateVotes[sortedCandidates[0]]} votes`)
        console.log(`Runner up: ${sortedCandidates[1]}`)

        let keys=Object.keys(winners).filter(x=>winners[x].hasOwnProperty(sortedCandidates[1]))
            .sort((a,b)=>{
                return winners[b][sortedCandidates[1]]-winners[a][sortedCandidates[1]]
            });

        for (const key of keys) {
            console.log(`${key}: ${winners[key][sortedCandidates[1]]}`)
        }
    }
    else{
        let firstPercentage=Math.floor((candidateVotes[sortedCandidates[0]]/total)*100);
        let secondPercentage=Math.floor((candidateVotes[sortedCandidates[1]]/total)*100);

        console.log(`Runoff between ${sortedCandidates[0]} with ${firstPercentage}% and ${sortedCandidates[1]} with ${secondPercentage}%`)
    }

}

storeVotes([ { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
    { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
    { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 } ]
)
