function solve(carData) {
    let commandProcessor = (function () {
        let cars = {};
        return {
            create: function (arr) {
                let name = arr[0];
                if (arr.length > 1) {
                    let fatherName = arr[2];
                    cars[name] = Object.create(cars[fatherName])
                } else {
                    cars[name] = {};
                }
            },
            set: function (arr) {
                let name = arr[0];
                let key = arr[1];
                let value = arr[2];
                cars[name][key] = value;
            },
            print:function (arr) {
                let car=arr[0];
                let pairs=[];
                for (let key in cars[car]) {
                    pairs.push(`${key}:${cars[car][key]}`)
                }
                console.log(pairs.join(', '))
            }
        }
    })()

    for (const cmd of carData) {
        let args=cmd.split(' ')
        let command=args.shift();
        commandProcessor[command](args)
    }
}
solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
)