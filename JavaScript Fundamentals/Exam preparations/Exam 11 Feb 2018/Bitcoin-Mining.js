function miningBitcoin(shifts) {
    shifts=shifts.map(Number)
    let total=0;
    let dayOfFirstBoughtBitcoin;
    let bitcoinPrice=11949.16;
    let goldPerGram=67.51;
    let currentDay=0;
    let firstBitcoinIsnotBought=true;
    for (let i = 0; i < shifts.length; i++) {
        currentDay++;
        if(currentDay%3===0){
            shifts[i]*=0.7;
        }
        total+=shifts[i]*goldPerGram;
        if(total>=bitcoinPrice&&firstBitcoinIsnotBought){
            dayOfFirstBoughtBitcoin=currentDay;
            firstBitcoinIsnotBought=false;
        }

    }

    let boughtBitcoins=Math.floor(total/bitcoinPrice);
    console.log(`Bought bitcoins: ${boughtBitcoins}`)
    if(dayOfFirstBoughtBitcoin>0){
        console.log(`Day of the first purchased bitcoin: ${dayOfFirstBoughtBitcoin}`)
    }

    let leftMoney=total%bitcoinPrice;
    console.log(`Left money: ${leftMoney.toFixed(2)} lv.`)
}
miningBitcoin([50,100])