<template>
  <div class="app-container">
    <h1>Video Game Quiz</h1>
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
      <button @click="skipQuestion">Skip</button> <button @click="nextQuestion">Next</button>
      <br>
    </div>
    <div v-if="showScore">
      <button @click="restartQuiz()">Restart</button>
      <br>
      <h3>Score: {{ score }} / {{ quizQuestions.length }} </h3>
    </div>
    <h3>Score: {{ score }}</h3>
    <br>
  </div>
</template>

<script>

// import quiz from './questions.json';

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
      quizQuestions: [
        {
          question: "TEST QUESTIONS?",
          answer: [
            { text: "1989", correct: true },
            { text: "1999"},
            { text: "1975" },
            { text: "1991" }
          ]
        },
        {
          question: "Which of the following video games takes place in a dystopian underwater city called Rapture?",
          answer: [
            { text: "Bioshock", correct: true },
            { text: "Half-Life"},
            { text: "God Of War" },
            { text: "Fallout 3" }
          ]
        },
        {
          question: "What Nintendo system was released after the N64 and before the Wii?",
          answer: [
            { text: "Gamecube", correct: true },
            { text: "Nintendo 128"},
            { text: "Virtual Boy" },
            { text: "Super Nintendo" }
          ]
        }
      ]
    }
  },
  methods: {
    selectResponse(e) {
      this.select = true;
      if(e.correct) this.score++;
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

    // left off here - https://javascript.info/async-await
    skipQuestion() {
      fetch('./test.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response
        })
        .then(response => { return response.json() })
        .then(jsonData => { console.log(jsonData.questions[1].question) })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    },

    restartQuiz() {
      Object.assign(this.$data, this.$options.data());
    }

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
