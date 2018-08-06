function solve(arr) {
    let namePattern = /\*[A-Z][a-zA-Z]*(?=\s|\t|$)/g;
    let phonePattern = /\+[0-9-]{10}(?=\s|\t|$)/g;
    let idPattern = /![A-Za-z0-9]+(?=\s|\t|$)/g;
    let basePattern = /_[A-Za-z0-9]+(?=\s|\t|$)/g;

    for (let element of arr) {
        console.log(element
            .replace(namePattern,name=>"|".repeat(name.length))
            .replace(phonePattern,phone=>"|".repeat(phone.length))
            .replace(idPattern,id=>"|".repeat(id.length))
            .replace(basePattern,base=>"|".repeat(base.length)))
    }
}

solve([
    "Agent *Ivankov was in the room when it all happened.",
    "I think it was +555-49-796",
    "He said something about \"finishing work\" with subject !2491a23BVB34Q and returning to Base _Aurora21",
    "Agent *Ivankov had to act quick in order.\n" +
    "He picked up his phone and called some "
])