<template>
  <div
    class="scoreboard-container"
    :style="{
      opacity:
        show === true ? '1' :
        '0'
    }"
  >
    <div class="current-score score-style">
      Score: {{ currentScrore }}
    </div>
    <div class="first-place score-style">
      Top 1: {{ modifiedScoreContainer[0] }}
    </div>
    <div class="second-place score-style">
      Top 2: {{ modifiedScoreContainer[1] }}
    </div>
    <div class="third-place score-style">
      Top 3: {{ modifiedScoreContainer[2] }}
    </div>
  </div>
</template>

<script>
let scoreContainer = [].splice(0, 3).sort((a, b) => b - a);

export default {
  props: {
    currentScrore: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    firstPlace: 0,
    secondPlace: 0,
    thirdPlace: 0,
    modifiedScoreContainer: [].splice(0, 3).sort((a, b) => b - a)
  }),
  // data() {
  //   return {
  //     firstPlace: 0,
  //     secondPlace: 0,
  //     thirdPlace: 0,
  //     scoreContainer: [].splice(0,3) // set array limit to three elements
  //   }
  // },
  computed: {
    updatedScoreContainer() {
      scoreContainer.push(this.$props.currentScrore);
      let modifiedScoreContainer = this.$data.modifiedScoreContainer
      modifiedScoreContainer = scoreContainer
      return modifiedScoreContainer;

      // scoreContainer.push(this.$props.currentScrore);
      // scoreContainer.sort((a, b) => b - a);
      // let modifiedScoreContainer = this.$data.modifiedScoreContainer;
      // modifiedScoreContainer = scoreContainer;
      // return modifiedScoreContainer;
    }
  },
  mounted() {
    // console.log(this.$data.modifiedScoreContainer);
    console.log(this.updatedScoreContainer);
    console.log(this.$data.modifiedScoreContainer);
  }
}
</script>

<style lang="scss" scoped>
.scoreboard-container {
  padding-top: 40px;
  padding-left: 60px;
  position: absolute;
  font-family: 'Jost', sans-serif;
}

.current-score {
  font-size: 28px;
}

.first-place {
  font-size: 20px;
}

.second-place {
  font-size: 20px;
}

.third-place {
  font-size: 20px;
}

.score-style {
  font-weight: bolder;
}
</style>