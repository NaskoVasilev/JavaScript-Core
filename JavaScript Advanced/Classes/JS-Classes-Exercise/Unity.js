class Rat {
    constructor(ratName) {
        this.name = ratName;
        this.allies = [];
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this.allies.push(otherRat)
        }
    }

    getRats() {
        return this.allies;
    }

    toString() {
        let output = this.name + '\n';
        for (const ally of this.allies) {
            output += '##' + ally.name + '\n';
        }
        return output
    }
}
let test = new Rat("Pesho");
console.log(test.toString()); //Pesho

console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
