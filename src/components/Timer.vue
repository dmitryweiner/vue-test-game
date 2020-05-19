<template>
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          :stroke-dasharray="circleDashArray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
let FULL_DASH_ARRAY = 283;

export default {
  data: () => ({
    timePassed: 0,
    timerInterval: null
  }),
  props: {
    resetGameTime: {
      type: Function,
      required: true
    },
    timeLimit: {
      type: Number,
      default: 10,
      required: true
    },
    warningThreshold: {
      type: Number,
      default: 4,
      required: true
    },
    alertThreshold: {
      type: Number,
      default: 2,
      required: true
    }
  },
  computed: {
    colorCodes() {
      return {
        info: {
          color: 'green'
        },
        warning: {
          color: 'orange',
          threshold: this.$props.warningThreshold
        },
        alert: {
          color: 'red',
          threshold: this.$props.alertThreshold
        }
      }
    },
    circleDashArray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },
    timeLeft() {
      return this.$props.timeLimit - this.timePassed;
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.$props.timeLimit;

      return rawTimeFraction - (1 / this.$props.timeLimit) * (1 - rawTimeFraction);
    },
    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes;
      
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    } 
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
        this.$props.resetGameTime(); // calls this function when timer is zero
      }
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    onTimesUp() {
      clearInterval(this.$data.timerInterval); 
    },
    startTimer() {
      this.$data.timerInterval = setInterval(() => (this.$data.timePassed += 1), 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 180px;
  height: 180px;
  &__svg {
    transform: scaleX(-1);
  }
  &__circle {
    fill: none;
    stroke: none;
  }
  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }
  &__path-remaining {
    stroke-width: 7px;
    // stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    &.green {
      color: rgb(65, 184, 131);
    }
    &.orange {
      color: orange;
    }
    &.red {
      color: red;
    }
  }
  &__label {
    position: absolute;
    width: 180px;
    height: 180px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
  }
}
</style>
