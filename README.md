# DWD Web Developer Test

### **Card Game:**
**To run:**
```
node card-game/cardGame.js
```
tie-breakers do exist and are accounted for

### **Quiz SPA:**

**Start server:**
```
cd quiz/server
npm start
```
Server will begin hosting on http://localhost:8000


**Start client:**
```
cd quiz/client
npm run serve
```
Client runs on http://localhost:8080

Client waits for start function to fire to begin game, at which point it grabs the questions .json, shuffles the question and answer orders, and propagates the page with the questions and answers.

Upon selecting an answer, a request is sent to the server with the name of the selected element appended at the end of the URL. Server checks url that was passed in, compares it to a list of keys it has available, and returns either an empty array, or an array with 1 item (a string matching the correct answer).

Additional submits are locked after each question is selected, and reset when the next question is loaded.  Points are tallied up at the end, and as an added bonus, the page judges you based on your performance.

*Note: I tried learning Vue.js as I was building this, and didn't separate the project into multiple components. I apologize in advance, I understand how to separate components via React architecture, but the few road bumps I hit caused me to round some corners.*
