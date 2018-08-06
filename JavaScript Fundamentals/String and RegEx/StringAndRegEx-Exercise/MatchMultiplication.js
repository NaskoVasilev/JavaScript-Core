function multiplication(bill) {
    let regex=/\b(-?\d+)\s*\*\s*(-?\d+\.\d+)\b/g;

    bill=bill.replace(regex,function(element,firstGroup,secondGroup){
        return Number(firstGroup)*Number(secondGroup);
    })
    console.log(bill);
}
multiplication("My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).")