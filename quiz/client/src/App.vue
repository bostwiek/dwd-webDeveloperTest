<template>

  <div class="app-container">

    <h1>Video Game Quiz</h1>

    <div v-for="(element, index) in quizQuestions.slice(currentQ, nextQ)" :key="index" v-show="quiz">
      <div class="qa-container">
				<h3>
					Question {{ nextQ }} / {{ quizQuestions.length }}
				</h3>
				<h3>
					{{ element.question }}
				</h3>
				<br>
				<ul>
					<li v-for="(item, index) in element.answer" :key="index" :class="select ? check(item) : 'unknown'" @click="selectResponse(item)">
						{{ element.answer[index].text }}
					</li>
				</ul>
			</div>
			<br>
			<button @click="nextQuestion">Next</button>
			<br>
    </div>

    <div> <!--  v-if="showScore" -->
      <br>
      <h2>Total Score: {{ score }} / {{ quizQuestions.length }} </h2>
			<h4 v-if="score < 6">Better luck next time!</h4>
			<h4 v-if="score > 5">Not bad!</h4>
			<br>
      <button @click="restartQuiz()">Restart</button>
    </div>
		
		<div v-if="!quizStarted">
			<br>
			<br>
			<br>
			<br>
			<button @click="startQuiz">Start Quiz</button>
			<br>
		</div>
		
  </div>

</template>

<script>

export default {

	name: 'Quiz',
  components: {
	},
	
  data() {
    return {
      score: 0,
      currentQ: 0,
			nextQ: 1,
			checkingAnswer: 0,
      select: false,
			showScore: false,
			quizStarted: false,
      quiz: true,
			quizQuestions: [],
			apiResponse: ''
    }
	},
	
  methods: {

		startQuiz() {
			this.loadQuestions();
			this.quizStarted = true;
		},

    async selectResponse(item) {
			if(!this.select) {
				try {
					const response = await fetch('http://localhost:8000/' + item.text);
					const data = response.json();
					if(data.then( arr => { this.checkingAnswer = arr.length } ) <= 1) alert('wow')
					
				} catch {
					console.error
				}
				// server ideally returns "item [ is / is not ] correct"
			}
			
				// server needs to validate this...
      if(item.correct && !this.select) ;
			this.select = true;
			
    },
    
    check(status) {
			// literally checks if the object clicked has the value "correct"
				// ideally, backend would handle this & replace this function
      return status.correct ? true : false
    },

    nextQuestion() {
      if(this.quizQuestions.length - 1 == this.currentQ) {
        this.showScore = true;
        this.quiz = false;
      } else {
        this.currentQ++;
        this.nextQ++;
        this.select = false;
      }
		},

		randomizeAnswers() {
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
			Object.assign(this.$data, this.$options.data());
			this.quizStarted = false;
    },

		async loadQuestions() {
			try {
				let response = await fetch('./test.json');
				let questions = await response.json();
				this.quizQuestions = this.randomizeQuestions(questions.questions);
				this.randomizeAnswers();
			} catch(err) {
				console.log(err)
			}
		},

  }
}

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
		height: 330px;
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
    background: #13b921;
    color: #fff;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
		user-select: none;
	}
  .unknown {
    background-color: #466b8f;
  }
  .false {
    background-color: #822424;
  }
	button {
    color: #94b8dc;
		background: #232527;
		padding: 10px 20px;
		border-radius: 8px;
		font-weight: bold;
		font-size: 1.2em;
	}

</style>
