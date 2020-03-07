class Card {
    constructor(color, value) {
        this.color = color;
        this.value = value;
    }
}

const createDeck = () => {
    let colors = ['--red', '--blue', '--green', '--yellow'];
    let values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse'];
    let wildDeck = ['wild', 'wild', 'wild', 'wild', 'draw4', 'draw4', 'draw4', 'draw4']
    let deck = [];

    for (let color of colors) {
        for (let value of values) {
            deck.push(new Card(color, value));
        }
    }

    for (let wild of wildDeck) {
        deck.push(new Card("", wild))
    }

    return deck;
}

const shuffle = (deck) => {
    let counter = deck.length,
        temp, i;

    while (counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
}

const deal = (deck) => {
    let hand = [];
    while (hand.length < 7) {
        hand.push(deck.pop());
    }
    return hand;
}

module.exports = {
    createDeck,
    shuffle,
    deal
}