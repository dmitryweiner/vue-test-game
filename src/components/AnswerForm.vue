<template>
  <div>
    <input type="text" id="answer" v-model="answer" />
    <button @click="sendAnswer">Answer</button>
  </div>
</template>
<script>
  export default {
    data: () => ({answer: ""}),
    methods: {
      sendAnswer() {
        this.$emit('checked', this.$data.answer);
      }
    }
  }
</script>
