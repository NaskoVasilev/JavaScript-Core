function printDeckOfCards(cards) {
    for (let i = 0; i <cards.length; i++) {
        let face=cards[i].substring(0,cards[i].length-1);
        let suit=cards[i][cards[i].length-1];
        try{
            cards[i]=makeCard(face,suit)
        }catch(ex){
            console.log("Invalid card: " + cards[i])
            return;
        }
    }

    console.log(cards.join(" "));

    function makeCard(type, suit) {
        let validCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let suits = {
            'S': '\u2660',
            'H': '\u2665',
            'D': '\u2666',
            'C': '\u2663',
        }
        if (!validCards.includes(type) || !suits.hasOwnProperty(suit)) {
            throw new Error('Invalid card or suit')
        }
        let card = {
            type: type,
            suit: suit,
            toString: function () {
                return this.type + suits[this.suit];
            }
        }
        return card;
    }
}
printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['AS', '10D', 'KH', '1C']);

