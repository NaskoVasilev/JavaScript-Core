function storeInfornation(arr) {
    let heroesInfo=[];

    for (let info of arr) {
        let heroInfo=info.split(' / ');
        let name=heroInfo[0];
        let level=heroInfo[1];
        let items=[];
        if(heroInfo.length>2){
            items=heroInfo[2].split((", "));
        }

        let hero={name:name,level:Number(level),items:items};
        heroesInfo.push(hero);
    }
    return JSON.stringify(heroesInfo);
}