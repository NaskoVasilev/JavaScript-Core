function calculateExpenses(lostFights,helmetPrice,swordPrice,shieldPrice,armorPrice) {
    let helmetExpese=Math.floor(lostFights/2)*helmetPrice;
    let swordExpese=Math.floor(lostFights/3)*swordPrice;
    let shieldExpese=Math.floor(lostFights/6)*shieldPrice;
    let armorExpese=Math.floor(lostFights/12)*armorPrice;

    let total=helmetExpese+swordExpese+shieldExpese+armorExpese;

    console.log(`Gladiator expenses: ${total.toFixed(2)} aureus`);
}
calculateExpenses(7,2,3,4,5)