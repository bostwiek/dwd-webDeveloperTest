import { createApp } from 'vue';
import App from './App.vue';

// players see 1 question at a time

// Players see score at the end

// Order of questions and answers should be randomized

// client should not know what answers are (everything serverside)

// server needs to handle question verification:
//    client sends a potential answer to the server and server verifies if correct
//    server responds with whether selected answer was correct or not, client reacts based on the response

createApp(App).mount('#app')
