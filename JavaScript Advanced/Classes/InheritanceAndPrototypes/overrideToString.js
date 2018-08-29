function solve() {
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

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }
        toString(){
            let classInfo=super.toString().slice(0,-1);
            return `${classInfo}, subject: ${this.subject})`
        }
    }

    class Student extends Person{
        constructor(name,email,course){
            super(name,email);
            this.course=course;
        }
        toString(){
            let classInfo=super.toString().slice(0,-1);
            return `${classInfo}, course: ${this.course})`
        }
    }

    return {Person, Teacher,Student}
}
let result=solve()
let Teacher=result.Teacher;
let Student=result.Student;
let Person=result.Person;
let teacher=new Teacher('kiro','k@abv.bg','JS')
let person=new Person('kiro','k@abv.bg')
let student=new Student('nasko','n@abv.bg','JS-CORE')
console.log(person.toString())
console.log(teacher.toString())
console.log(student.toString())





