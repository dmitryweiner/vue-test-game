<template>
  <div id="app">
    <ScoreBord
      :currentScrore="currentScrore"
      :show="isScoreboardVisible"
    />
    <div class="app-container">
      <GameStartModalWindow
        :show="isGameStartModalVisible"
        @close="startTimerToStartGame"
      />
      <GameEndModalWindow
        :show="isGameEndModalVisible"
        @close="startTimerToStartGame"
        v-if="answerResultMessage === 'Time is over!'"
      />
      <Timer
        class="timer"
        :resetGameTime="resetGameTime"
        :timeLimit="timerTimeLimit"
        :warningThreshold="warningThreshold"
        :alertThreshold="alertThreshold"
        v-if="isStateRun"
      />
      <div class="game-form">
        <GameStartTimer
          style="text-align: center;"
          :timeToStart="3"
          :startGameAfterTimerEnd="startGameAfterTimerEnd"
          v-if="isGameStarting"
        />
        <div class="answer-result-message">
          <Message
            :message="answerResultMessage"
            v-if="isStateAnswer"
          />
          <div
            :style="{
              color:
                answerResultMessage === 'Correct!' ? '#2CE855' : '#EB3D3D',
              display:
                answerResultMessage === 'Time is over!' ? 'none' : ''
            }"
          >
            {{ answerResultMessage }}
          </div>
        </div>
        <Question
          class="question"
          :question="question"
          v-if="isStateRun"
        />
        <AnswerForm
          :handler="answerHandler"
          v-model="answerResult"
          v-if="isStateRun"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ScoreBord from './components/ScoreBord'
import Question from './components/Question.vue';
import Timer from './components/Timer';
import GameStartTimer from './components/GameStartTimer';
import AnswerForm from './components/AnswerForm.vue';
import Message from './components/Message.vue';
import GameStartModalWindow from './components/GameStartModalWindow';
import GameEndModalWindow from './components/GameEndModalWindow'
import { checkAnswer, generateQuestion } from './services/questions';

const GAME_STATE_IDLE = 'idle';
const GAME_STATE_RUN = 'run';
const GAME_STATE_SHOW_ANSWER = 'showAnswer';

export default {
  name: 'App',
  components: {
    ScoreBord,
    GameStartModalWindow,
    GameEndModalWindow,
    Question,
    Timer,
    GameStartTimer,
    AnswerForm,
    Message
  },
  data: () => ({
    gameState: GAME_STATE_IDLE,
    isGameStartModalVisible: true,
    isGameEndModalVisible: true,
    isGameStarting: false,
    question: null,
    userAnswer: '',
    answerResultMessage: '',
    answerResult: '',
    timerTimeLimit: 0,
    warningThreshold: 0,
    alertThreshold: 0,
    currentScrore: 0,
    isScoreboardVisible: true
  }),
  computed: {
    isStateRun() {
      return this.$data.gameState === GAME_STATE_RUN;
    },
    isStateAnswer() {
      return this.$data.gameState === GAME_STATE_SHOW_ANSWER;
    },
    isStateIdle() {
      return this.$data.gameState === GAME_STATE_IDLE;
    }
  },
  methods: {
    resetGameTime() { // stop game when time go beyond 0
      this.$data.answerResultMessage = 'Time is over!';
      this.$data.isGameEndModalVisible = true;
      // if (this.$data.answerResultMessage === 'Time is over!') {
      //   this.$data.isScoreboardVisible = false;
      // }
      this.$data.gameState = GAME_STATE_IDLE;
      console.log(this.$data.currentScrore);
    },
    startGameAfterTimerEnd() {
      this.$data.gameState = GAME_STATE_RUN;
      this.$data.answerResultMessage = '';
      this.$data.question = generateQuestion();
      this.$data.isGameStarting = false;
      this.$data.isScoreboardVisible = true;

    },
    startTimerToStartGame() {
      this.$data.isGameStartModalVisible = false;
      this.$data.isGameEndModalVisible = false;
      this.$data.isGameStarting = true;
      this.$data.timerTimeLimit = 1000;
      this.$data.warningThreshold = 4;
      this.$data.alertThreshold = 2;
      this.$data.currentScrore = 0;
    },
    answerHandler(answer) {
      if (checkAnswer(this.$data.question, Number.parseInt(answer))) {
        this.$data.answerResultMessage = 'Correct!';
        this.$data.answerResult = '';
        this.$data.currentScrore += 100;


        this.$data.timerTimeLimit += 2;
        this.$data.warningThreshold += 2;
        this.$data.alertThreshold += 2;

        setTimeout(() => {
          this.$data.answerResultMessage = ''
        }, 500);
        this.$data.question = generateQuestion();
      } else {
        if (this.$data.answerResult !== '' && this.$data.answerResultMessage === 'Wrong!') {
          this.$data.currentScrore -= 25;
        }
        this.$data.answerResultMessage = 'Wrong!';
      }
      // TODO?
      // this.$data.gameState = GAME_STATE_SHOW_ANSWER;
    }
  }
};
</script>

<style lang="scss">
@import './assets/globalStyles/buttonStyles';
@import './assets/globalStyles/colorStyles';

.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.game-form {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}

.game-start-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.answer-result-message {
  width: 240px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
}

.question {
  width: 240px;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  margin: 4px 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $Bluewood;
  padding: 0;
  margin: 0;
  font-family: 'Jost', sans-serif;
}

html {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  font-family: 'Jost', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Jost', sans-serif;
}
</style>
