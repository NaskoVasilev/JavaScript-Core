let Entity =require('./entity')

class Person extends Entity{
    constructor(name,phrase,dog){
        super(name);
        this.phrase=phrase;;
        this.dog=dog;
    }
    saySomething(){
        return `${this.name} says: ${this.phrase}`+this.dog.saySomething();
    }
}

module.exports=Person