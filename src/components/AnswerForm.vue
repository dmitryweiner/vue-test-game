<template>
  <div>
    <input type="text" id="answer" v-model="answer" />
    <button @click="sendAnswer">Answer</button>
  </div>
</template>
<script>
  export default {
    props: [
      "handler",
    ],
    data: () => ({answer: ""}),
    methods: {
      sendAnswer() {
        this.$emit('handler', this.answer);
      }
    }
  }
</script>
