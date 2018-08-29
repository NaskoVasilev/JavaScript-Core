function solution() {
    let supply = {};
    supply['protein']=0;
    supply['carbohydrate']=0;
    supply['fat']=0;
    supply['flavour']=0;

    function executeCommand(command) {
        let tokens = command.split(' ');
        let action = tokens[0];
        if (action === 'restock') {
            let element = tokens[1];
            let quantity = Number(tokens[2]);
            supply[element] += quantity;
            return 'Success'
        }
        else if (action === 'report') {
            return `protein=${supply['protein']} carbohydrate=${supply['carbohydrate']} fat=${supply['fat']} flavour=${supply['flavour']}`
        }
        else if (action === 'prepare') {
            let meal=tokens[1];
            let quantity=Number(tokens[2]);
            let neededProtein=0;
            let neededCarbohydrate=0;
            let neededFat=0;
            let neededFlavour=0;

            switch (meal){
                case 'apple':
                    neededCarbohydrate=1;
                    neededFlavour=2;
                    break;
                case 'coke':
                    neededCarbohydrate=10;
                    neededFlavour=20;
                    break;
                case 'burger':
                    neededCarbohydrate=5;
                    neededFat=7;
                    neededFlavour=3;
                    break;
                case 'omelet':
                    neededProtein=5;
                    neededFat=1;
                    neededFlavour=1;
                    break;
                case 'cheverme':
                    neededProtein=10;
                    neededFat=10;
                    neededCarbohydrate=10;
                    neededFlavour=10;
                    break;
            }

            neededProtein*=quantity;
            neededCarbohydrate*=quantity;
            neededFat*=quantity;
            neededFlavour*=quantity;

            if(supply['protein']<neededProtein){
                return 'Error: not enough protein in stock'
            }
            else if(supply['carbohydrate']<neededCarbohydrate){
                return 'Error: not enough carbohydrate in stock'
            }
            else if(supply['fat']<neededFat){
                return 'Error: not enough fat in stock'
            }
            else if(supply['flavour']<neededFlavour){
                return 'Error: not enough flavour in stock'
            }
            else{
                supply['protein']-=neededProtein;
                supply['carbohydrate']-=neededCarbohydrate;
                supply['fat']-=neededFat;
                supply['flavour']-=neededFlavour;
                return 'Success';
            }
        }
    }

    return executeCommand;
}

let manager = solution();
manager('restock carbohydrate 10')
manager('restock flavour 10')
manager('prepare apple 1')
manager('restock fat 10')
manager('prepare burger 1')
manager('report')