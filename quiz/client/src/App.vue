<template>
	<div class="app-container">

		<h1>Video Game Quiz</h1>

		<div v-for="(element, index) in quizQuestions.slice(currentQ, nextQ)" :key="index" v-show="quiz">
			<div class="qa-container">
				<h3 style="margin-bottom: 40px">
					Question {{ nextQ }} / {{ quizQuestions.length }}
				</h3>
				<h3 style="margin-bottom: 40px">
					{{ element.question }}
				</h3>
				<ul>
					<li v-for="(item, index) in element.answer" :key="index" @click="selectResponse(item)">
						{{ element.answer[index].text }}
					</li>
				</ul>
			</div>
			<button @click="nextQuestion">Next</button>
		</div>

		<div v-if="showScore">
			<h2 style="margin-bottom: 40px">Total Score: {{ score }} / {{ quizQuestions.length }} </h2>
			<h4 style="margin-bottom: 60px"> {{ iJudgeYou }} </h4>
			<button @click="restartQuiz()">Restart</button>
		</div>
		
		<div v-if="!quizStarted" style="margin-top: 100px">
			<button @click="startQuiz" style="font-size: 1.6em">Start Quiz</button>
		</div>

	</div>
</template>

<script>

export default {

	name: 'Quiz',

	data() {
		return {
			score: 0,
			currentQ: 0,
			nextQ: 1,
			select: false,
			showScore: false,
			quizStarted: false,
			quiz: true,
			quizQuestions: [],
			iJudgeYou: ''
		}
	},
	
	methods: {

		startQuiz() {
			this.loadQuestions();
			this.quizStarted = true;
		},

		// this fires whenever a potential answer is selected
		async selectResponse(item) {
			if(!this.select) {
				this.select = true;
				try {
					// throws a request to quiz/server, and checks if the name clicked matches any of the server's keys
					const response = await fetch('http://localhost:8000/' + item.text);
					const data = response.json();
					data.then( arr => { arr.length > 0 ? this.addScore(item, 1) : this.addScore(item, 0) });
				} catch {
					console.error
				}
			}
		},
		
		addScore(item, n) {
			// if n = 1, answer selected earlier was correct
			if(n > 0) {
				this.score++;
			}
			this.animateButtons(item);
		},

		animateButtons(item) {
			// this is terrible code, but had trouble getting styling reading from server call :(
			let liArr = document.querySelectorAll("li");
			liArr.forEach((e, i) => {
				if(item.correct == true && liArr[i].innerText == item.text) {
					liArr[i].classList.add("correct")
				} else {
					liArr[i].classList.add("incorrect")
				}				
			});
		},

		clearButtons() {
			let liArr = document.querySelectorAll("li");
			liArr.forEach((e, i) => {
				liArr[i].classList.remove("correct")
				liArr[i].classList.remove("incorrect")
			});
		},

		nextQuestion() {
			if(this.quizQuestions.length - 1 == this.currentQ) {
				// reached end of quiz here
					// tally up score and assign appropriate response
						if(this.score >= 12) { this.iJudgeYou = scoreResponse[0] }
							else if (this.score > 10) { this.iJudgeYou = scoreResponse[1] }
							else if (this.score > 6 ) { this.iJudgeYou = scoreResponse[2] }
							else if (this.score > 0 ) { this.iJudgeYou = scoreResponse[3] }
							else { this.iJudgeYou = scoreResponse[4] }
				this.showScore = true;
				this.quiz = false;
			} else {
				// the show must go on
				this.currentQ++;
				this.nextQ++;
				this.clearButtons();
				this.select = false;
			}
		},

		randomizeAnswers() {
			// I reuse the shuffle function from the card game a lot
			const arrLength = this.quizQuestions.length;
			for(let i = 0; i < arrLength; i++) {
				for(let n = 0; n < 8; n++) {
					let posA = Math.floor(Math.random() * 4),
							posB = Math.floor(Math.random() * 4),
							tempPos = this.quizQuestions[i].answer[posA];
					// continously generate a new posB until it does not match
					while(posA == posB) {
						posB = Math.floor(Math.random() * 4)
					}
					// and switch
					this.quizQuestions[i].answer[posA] = this.quizQuestions[i].answer[posB];
					this.quizQuestions[i].answer[posB] = tempPos;
				}

			}
		},

		randomizeQuestions(arr) {
			const arrLength = arr.length,
						arrOrder = [], sortedArr = [];
			// fill new array with indexes to randomize
			for(let i = 0; i < arrLength; i++) {
				arrOrder.push(i);
			}
			// shuffle those indexes
			for(let i = 0; i < 20; i++) {
				let posA = Math.floor(Math.random() * arrLength),
						posB = Math.floor(Math.random() * arrLength),
						tempPos = arrOrder[posA];
				// continously generate a new posB until it does not match
				while(posA == posB) {
					posB = Math.floor(Math.random() * arrLength)
				}
				// and switch
				arrOrder[posA] = arrOrder[posB];
				arrOrder[posB] = tempPos;
			}
			// push new 
			arrOrder.forEach(e => {
				sortedArr.push(arr[e])
			})
			return sortedArr;
		},

		restartQuiz() {
			// reset values to defaults
			Object.assign(this.$data, this.$options.data());
			this.quizStarted = false;
		},

		async loadQuestions() {
			// this ideally would have been hosted on server, time constraints killed me in this section
			try {
				let response = await fetch('./questions.json');
				let questions = await response.json();
				this.quizQuestions = this.randomizeQuestions(questions.questions);
				this.randomizeAnswers();
			} catch(err) {
				console.log(err)
			}
		},

	}
}

const scoreResponse = [
								"Bravo! Now go get some exercise and sunlight, you must be starved of nutrients",
								"So close! Probably a misclick, or bad netcode.",
								"Well done.",
								"At least you get a bronze trophy.",
								"You blew it lol" ]

</script>

<style>

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #7aa1c9;
		margin-top: 20px;
	}
	.app-container {
		display: grid;
		grid-template-columns: repeat(1, 3fr);
		width: 90%;
		max-width: 720px;
		min-width: 300px;
		margin: 0 auto;
	}
	.qa-container {
		height: 380px;
	}
	h1 {
		color: #94b8dc;
	}
	ul {
		list-style-type: none;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	li {
		margin: 5px;
		padding: 20px;
		vertical-align: middle;
		background-color: #466b8f;
		color: #fff;
		border-radius: 5px;
		transition: all 0.2s ease-in-out;
		user-select: none;
	}
	button {
		color: #94b8dc;
		background: #232527;
		border: none;
		padding: 10px 20px;
		border-radius: 8px;
		font-weight: bold;
		font-size: 1.2em;
	}
	.incorrect {
		background-color: #ac1414;
	}
	.correct {
		background-color: #167c20;
	}

</style>