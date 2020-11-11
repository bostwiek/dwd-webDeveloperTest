class Deck {
	constructor() {
		this.cards = [];
	}
	createDeck() {

		// store all the card values and names in arrays
		let names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
								'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
		let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
		let values = [15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

		// loop through and create all cards by (names.length * suits.length)
		for(let n = 0; n < names.length; n++) {
			for(let s = 0; s < suits.length; s++) {
				this.cards.push(new Card(names[n], suits[s], values[n]))
			}
		}
	}

	shuffleDeck() {
		// obligatory offering to satan when generating random numbers
		for(let i = 0; i < 666; i++) {
			let posA = Math.floor(Math.random() * this.cards.length),
					posB = Math.floor(Math.random() * this.cards.length),
					tempCard = this.cards[posA];
			// continously generate a new posB until it does not match
			while(posA == posB) {
				posB = Math.floor(Math.random() * this.cards.length)
			}
			// give 'er the old bait n' switch
			this.cards[posA] = this.cards[posB];
			this.cards[posB] = tempCard;
		}
	}
}

class Card {
	constructor(name, suit, value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.hand = [],
		this.points = 0;
	}
	sortHand() {
		// define suit priority
		const suitGuide = {
			'Hearts': 1, 'Diamonds': 2, 'Clubs': 3, 'Spades': 4
		}
		// compare functions for sorting objects
		function sortCardValue(a, b) {
			return a.value < b.value ? 1 : -1;
		}
		function sortCardSuit(a, b) {
			return suitGuide[b.suit] < suitGuide[a.suit] ? 1 : -1;
		}
		// sort by point value, then suit
		this.hand.sort(sortCardValue).sort(sortCardSuit);
	}

	// players can draw cards from the top of the deck
	drawCard(card) {
		this.hand.push(card);
		this.sortHand();
	}

	// and this totals the player's points, storing and returning this.points
	totalPoints() {
		this.points = 0;
		this.hand.forEach(c => {
			this.points += c.value
		})
		return this.points;
	}

	// printing player name, hand, and points to console
	printCardsToConsole() {
		let cardsString = ``;
		this.hand.forEach((e, i) => {
			cardsString += `	${this.hand[i].name} of ${this.hand[i].suit} - ${this.hand[i].value}\n`
		});
		console.log(
`${this.name}'s hand:

${cardsString}
Total Points - ${this.points}

---
`);
	}
}


class Game {

	// create new instance of deck + empty container for players
	constructor() {
		this.players = []
	}

	start() {
		// chaos must decide the number of combatants (2 = minimum)
		let playerCount = Math.floor(Math.random() * 5) + 2
		for(let i = 2; i < playerCount + 2; i++) {
			this.players.push(new Player('Player ' + (i - 1)));
		}
	
		// generate deck and shuffle
		const deck1 = new Deck;
		deck1.createDeck()
		deck1.shuffleDeck();

		// each player (p) takes turn drawing 5 cards from the deck
		for(let i = 0; i < 5; i++) {
			this.players.forEach((player, p) => {
				this.players[p].drawCard(deck1.cards.shift());
			})
		}

		// sort and read all players hands
		this.players.forEach((player, playerID) => {
			this.players[playerID].sortHand();
			this.players[playerID].totalPoints();
			this.players[playerID].printCardsToConsole();
		});
	}

	end() {
		// sort by total points
		function sortPlayerPoints(a, b) {
			return a.points < b.points ? 1 : -1;
		}
		this.players.sort(sortPlayerPoints);
		let winner = this.players[0];
		// check if there's a tie...
		if(winner.points == this.players[1].points) {
			// count how many ties if we're made it here
			let i = 1;
			while(this.players[i-1].points == this.players[i].points) {i++;}
			// alert console of this monumental occasion
			console.log(`\n${i} Players have tied! Let our lord and savior choose.\n\n`);
			// let RNGsus sort this mess out
			winner = this.players[Math.floor(Math.random() * i)];
			console.log(`\nRNGsus has chosen! ${winner.name} is the winner!!!\n\n`);
		}
		
		
		console.log(`
${winner.name} has won with ${winner.points} points!
		`)
	}
	
}

let newGame = new Game;
newGame.start();
newGame.end();