function extendPrototype(currentClass) {
    currentClass.prototype.species="Human";
    currentClass.prototype.toSpeciesString=function () {
        return `I am a ${this.species}. ${this.toString()}`
    }
}
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    toString(){
        let className=this.constructor.name;
        return `${className} (name: ${this.name}, email: ${this.email})`
    }
}
let person=new Person('Pesho','p@abv.bg')
console.log(person+"");
extendPrototype(Person)
console.log(person.toSpeciesString());
