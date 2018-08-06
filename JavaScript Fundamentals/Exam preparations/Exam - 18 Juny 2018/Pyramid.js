function calculateMaterials(base,increment){
    let totalGold=0;
    let totalMarble=0;
    let totalStone=0;
    let totalLapis=0;
    let height=0;
    for (let i = base; i >=1; i-=2) {
        height++;

        if(i===1||i===2){
            totalGold=i*i;
        }
        else if(height%5===0){
            totalStone+=(i-2)*(i-2);
            totalLapis+=4*i-4;
        }
        else{
            totalStone+=(i-2)*(i-2);
            totalMarble+=4*i-4
        }
    }

    console.log(`Stone required: ${Math.ceil(totalStone*increment)}`)
    console.log(`Marble required: ${Math.ceil(totalMarble*increment)}`)
    console.log(`Lapis Lazuli required: ${Math.ceil(totalLapis*increment)}`)
    console.log(`Gold required: ${Math.ceil(totalGold*increment)}`)
    console.log(`Final pyramid height: ${Math.floor(height*increment)}`);
}
calculateMaterials(11,1)
calculateMaterials(11,0.75)
calculateMaterials(23,0.5)
calculateMaterials(12,1)