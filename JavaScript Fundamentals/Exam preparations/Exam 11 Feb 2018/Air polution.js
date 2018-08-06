function airPolution(sofiaMap,forces) {
    let length=5;
    sofiaMap=sofiaMap.map(e=>e.split(" ").map(Number));
    
    let commands={
        "breeze":function (value) {
            //sofiaMap[value]=sofiaMap[value].map(e=>e-15);
            for (let col = 0; col <length; col++) {
                sofiaMap[value][col]-=15;
                if(sofiaMap[value][col]<0){
                    sofiaMap[value][col]=0;
                }
            }
        },
        "gale":function (value) {
            for (let row = 0; row <length; row++) {
                sofiaMap[row][value] -= 20;
                if(sofiaMap[row][value]<0){
                    sofiaMap[row][value]=0;
                }
            }
        },
        "smog":function (value) {
            for (let i = 0; i <length; i++) {
                sofiaMap[i]=sofiaMap[i].map(e=>e+value);
            }
        }
    }

    for (const force of forces) {
        let[type,value]=force.split(" ");
        value=Number(value);
        commands[type](value);
    }
    let polutedCoordinates=[];
    for (let i = 0; i < sofiaMap.length; i++) {
        for (let j = 0; j < sofiaMap.length; j++) {
            if(sofiaMap[i][j]>=50){
                polutedCoordinates.push(`[${i}-${j}]`)

            }
        }
    }
    if(polutedCoordinates.length>0){
        let output="Polluted areas: ";
        console.log(output+polutedCoordinates.join(", "))
    }
    else{
        console.log("No polluted areas")
    }

}
airPolution(
    ["5 7 72 14 4",
    "41 35 37 27 33",
    "23 16 27 42 12",
    "2 20 28 39 14",
    "16 34 31 10 24",
],
["breeze 1", "gale 2", "smog 25"]
)

airPolution([
        "5 7 3 28 32",
        "41 12 49 30 33",
        "3 16 20 42 12",
        "2 20 10 39 14",
        "7 34 4 27 24",
    ],
    [
        "smog 11", "gale 3",
        "breeze 1", "smog 2"
    ]
)