let Extensible = (function () {
    let id = 0;

    class ObjectExetnd {
        constructor() {
            this.id = id++;
        }

        extend(template) {
            for (const key in template) {
                if (typeof template[key] === 'function') {
                    ObjectExetnd.prototype[key] = template[key]
                }
                else {
                    this[key] = template[key];
                }
            }
        }
    }

    return ObjectExetnd
})()
let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();
console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);

let template = {
    extensionData: 5,
    extensionMethod: function (value) {
        return value + 1;
    }
};

let testObj = new Extensible();
console.log(testObj.id)
testObj.extend(template);
console.log(testObj.hasOwnProperty('extensionData'));
console.log(testObj.extensionData)
console.log(Object.getPrototypeOf(testObj).hasOwnProperty('extensionMethod'));
