let expect=require('chai').expect;

class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1])
                        }
                    }
                    return message;
                }
            }
        }
    }
};

describe("C# Console class Unit-Tests",function () {
    it('return a string',function () {
        expect(Console.writeLine('pesho')).to.be.equal('pesho');
    })
    it('return undefined ',function () {
        expect(Console.writeLine(3)).to.be.undefined;
    })
    it('return a object in JSON format',function () {
        let obj={a:5,name:'pesho',number:5}
        expect(Console.writeLine(obj)).to.be.equal(JSON.stringify(obj));
    })
    it('throws type error if first parameter is not a string',function () {
        expect(()=>Console.writeLine(3,'aaa')).to.throw(TypeError);
    })
    it("throws type error if both parameter is a string", function () {
        expect(()=>Console.writeLine('ss','aa')).to.throw(TypeError)
    })
    it("throws type error if first parameter is not a string", function () {
        expect(()=>Console.writeLine({a:5},'aa',12,'bb')).to.throw(TypeError)
    })
    it('throws range error if number of parameters are more then placeholders',function () {
        expect(()=>Console.writeLine('Nasko{0}',12,'aaa')).to.throw(RangeError)
    })
    it("throws range error if number of parameters are less then placeholders", function () {
        expect(()=>Console.writeLine('Niki{0}{1}',20)).to.throw(RangeError)
    })
    it("throws range error if number of a placeholder is with too big number", function () {
        expect(()=>Console.writeLine('Niki{0}{13}',20,12)).to.throw(RangeError)
    })
    it("throws range error if number of a placeholder is with too small number", function () {
        expect(()=>Console.writeLine('Niki{-1}{1}',20,12)).to.throw(RangeError)
    })
    it("throws range error if number of a placeholder is with too big number", function () {
        expect(()=>Console.writeLine('Niki{0}{1}{13}',20,12,12)).to.throw(RangeError)
    })
    it("works correct", function () {
        expect(Console.writeLine('Niki{0}{1}{2}','20','12','12')).to.be.equal('Niki201212')
    })
    it("throw RangeError for too many arguments", function () {
        expect(()=>Console.writeLine('Niki{1}{0}',20,12,12)).to.throw(RangeError)
    })
    it("works correct", function () {
        expect(Console.writeLine('Niki{0}',20)).to.be.equal('Niki20')
    })
    it("works correct", function () {
        expect(Console.writeLine('Niki{0}')).to.be.equal('Niki{0}')
    })
    it("works correct", function () {
        expect(Console.writeLine('Niki{0}',{niki:'Poli'})).to.be.equal('Niki[object Object]')
    })
    it("works correct", function () {
        let a="a"

        expect(Console.writeLine('Niki{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}',a,1,2,3,4,5,6,7,8,9)).to.be.equal('Nikia123456789')
    })
    it("throw RangeError if placeholders do not start form 0 ", function () {
        expect(()=>Console.writeLine('Niki(0){1}{2}{3}{4}{5}{6}{7}{8}{9}','a',1,2,3,4,5,6,7,8,9)).to.throw(RangeError)
    })
    it("throw Range error", function () {
        let a = 'a'
        expect(()=>Console.writeLine('Niki{0.1}{1}',a,'b')).to.throw(RangeError)
    })
    it("throw Type error without parameters", function () {
        let a = 'a'
        expect(()=>Console.writeLine()).to.throw(TypeError)
    })
    it("Console has ownProperty writeline", function() {
        expect(Console.prototype.constructor.hasOwnProperty('writeLine')).to.be.equal(true)
    })
    it("throw TypeError", function () {
        let a = 'a'
        expect(()=>Console.writeLine({Niki:'{0}'},a)).to.throw(TypeError)
    })
    it("should return error", function () {
        expect(()=>Console.writeLine('niki {12}','a')).to.throw(RangeError)
    })
})
