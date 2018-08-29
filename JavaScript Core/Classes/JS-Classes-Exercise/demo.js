class Cat {
    constructor(name,age){
        this.name=name;
        this.age=age;
        Object.seal(this)
    }
}
let cat=new Cat('aaa',12)
cat.name='bbb'
cat.age=13;
cat.gender="M"
console.log(cat)
