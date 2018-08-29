function computer() {
    class Device {
        constructor(manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Device {
        constructor(manufacturer, responseTime) {
            super(manufacturer)
            this.responseTime = Number(responseTime);
        }
    }

    class Monitor extends Device {
        constructor(manufacturer, width, height) {
            super(manufacturer)
            this.width = Number(width);
            this.height = Number(height);
        }
    }

    class Battery extends Device {
        constructor(manufacturer, expectedLife) {
            super(manufacturer)
            this.expectedLife = Number(expectedLife);
        }
    }

    class Computer extends Device {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw  new Error("You cannot instantiate abstract class")
            }
            super(manufacturer)
            this.processorSpeed = Number(processorSpeed);
            this.ram = Number(ram);
            this.hardDiskSpace = Number(hardDiskSpace);
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.weight = Number(weight);
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(value) {
            if (value instanceof Battery) {
                this._battery = value;
            } else {
                throw new TypeError('Argument is not instance of class Battery')
            }
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(value) {
            if (value instanceof Keyboard) {
                this._keyboard = value;
            } else {
                throw new TypeError('Argument is not instance of class Keyboard')
            }
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(value) {
            if (value instanceof Monitor) {
                this._monitor = value;
            } else {
                throw new TypeError('Argument is not instance of class Monitor')
            }
        }
    }

    return {
        Keyboard,
        Monitor,
        Battery,
        Computer,
        Laptop,
        Desktop
    }
}


//Mixins functions
//optional functionality

function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3
        }
        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4);
        }
        classToExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)
        }

    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer === this.keyboard.manufacturer
                && this.manufacturer === this.monitor.manufacturer;
        }
        classToExtend.prototype.isClassy = function () {
            return this.battery.expectedLife >= 3
                && (this.color === "Silver" || this.color === "Black")
                && this.weight < 3
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}

let result=computer();
let Laptop=result.Laptop;
let Battery=result.Battery;

let mixins=createMixins();
mixins.computerQualityMixin(Laptop);
console.log(Laptop.prototype);
console.log()
mixins.styleMixin(Laptop)
console.log(Laptop.prototype);
console.log()

console.log()
let battery = new Battery('Energy',3);
let laptop = new Laptop("Hewlett Packard",2.4,4,0.5,2.99,"Silver",battery);
console.log(laptop.isClassy());

