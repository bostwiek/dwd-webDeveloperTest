<template>

  <div class="app-container">

    <h1>Video Game Quiz</h1>

		<div>
			<br>
			<button @click="startQuiz">Take Quiz</button>
			<br>
		</div>

    <div v-for="(element, index) in quizQuestions.slice(currentQ, nextQ)" :key="index" v-show="quiz">
      <h3>Question {{ nextQ }} / {{ quizQuestions.length }} </h3>
      <h3>
        {{ element.question }}
      </h3>
      <br>
      <ul>
        <li v-for="(item, index) in element.answer" :key="index" :class="select ? check(item) : 'unknown'" @click="selectResponse(item)">
          {{ element.answer[index].text }}
        </li>
      </ul>
			<br><br>
			<button @click="nextQuestion">Next</button>
			<br>
    </div>

    <div v-if="showScore">
      <button @click="restartQuiz()">Restart</button>
      <br>
      <h3>Total Score: {{ score }} / {{ quizQuestions.length }} </h3>
			<h3 v-if="score < 7">Too bad, better luck next time!</h3>
			<h3 v-if="score > 6">Better than most!</h3>
    </div>
		
  </div>

</template>

<script>

export default {

	name: 'App',
	
  components: {
	},
	
  data() {
    return {
      score: 0,
      currentQ: 0,
      nextQ: 1,
      select: false,
      showScore: false,
      quiz: true,
      quizQuestions: []
    }
	},
	
  methods: {

		startQuiz() {
			this.loadQuestions();
		},

    async selectResponse(item) {
			try {
				let response = await fetch('http://localhost:9000?answer='+item.text);
				console.log(response)
			} catch {
				console.error
			}
      if(item.correct && !this.select) this.score++;
			this.select = true;
			// if(item.correct == true) alert("yas queen")
			// try {
			// 	console.log(item)
			// } catch(err) {
			// 	console.log(err)
			// }
			// server needs to validate this...
    },
    
    check(status) {
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
    },

		async loadQuestions() {
			try {
				let response = await fetch('http://localhost:9000/test.json');
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
    color: #2c3e50;
    margin-top: 60px;
  }
  ul {
    list-style-type: none;
  }
  li {
    display: inline-block;
    padding: 20px;
    background: #13b921;
    color: #fff;
    margin: 5px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
  }
  .unknown {
    background-color: #466b8f;
  }
  .false {
    background-color: #822424;
  }

</style>
