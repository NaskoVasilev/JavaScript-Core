function result() {
    let map=new Map();

    for (const argument of arguments) {
        let type =typeof argument;

        if(!map.has(type)){
            map.set(type,0);
        }
        map.set(type,map.get(type)+1);

        console.log(`${type}: ${argument}`);
    }

    [...map].
    sort((a,b)=>b[1]-a[1])
        .forEach(element=>console.log(`${element[0]} = ${element[1]}`))
    
}
result('cat', 42, function () { console.log('Hello world!'); });