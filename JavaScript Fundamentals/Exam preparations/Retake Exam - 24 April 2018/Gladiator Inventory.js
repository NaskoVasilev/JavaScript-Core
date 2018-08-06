function editInventory(arr) {
    let inventory=arr.shift().split(" ");

    let commands={
        "Buy":function(item){
            if(!inventory.includes(item)){
                inventory.push(item);
            }
        },
        "Trash":function(item){
            let index=inventory.indexOf(item);
            if(index>=0){
                inventory.splice(index,1);
            }
        },
        "Repair":function(item){
            let index=inventory.indexOf(item);
            if(index>=0){
                inventory.splice(index,1);
                inventory.push(item);
            }
        },
        "Upgrade":function(item){
            let [initialElement,upgrade]=item.split("-");

            let index=inventory.indexOf(initialElement);
            if(index>-1){
                let upgradedElement=initialElement+":"+upgrade;
                inventory.splice(index+1,0,upgradedElement);
            }
        },
        "Fight!":function(item){
            console.log(inventory.join(" "));
        }
    }

    for (let action of arr) {
        let [command,item]=action.split(" ");
        commands[command](item);
    }
}

editInventory(
    [
        'SWORD Shield Spear',
        'Buy Bag',
        'Trash Shield',
        'Repair Spear',
        'Upgrade SWORD-Steel',
        'Fight!',
    ]
)