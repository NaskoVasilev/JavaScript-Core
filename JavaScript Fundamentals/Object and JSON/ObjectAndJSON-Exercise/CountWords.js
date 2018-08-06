function wordCounts(arr) {
    let words=arr.join(' ').toLowerCase().split(/\W+/)
        .filter(w=>w!="");
    let map=new Map();

    for (let word of words) {
        if(!map.has(word)){
            map.set(word,0);
        }
        map.set(word,map.get(word)+1);
    }

    let keys=Array.from(map.keys()).sort();
    for (let key of keys) {
        console.log(`'${key}' -> ${map.get(key)} times`)
    }
}