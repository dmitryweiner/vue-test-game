<template>
  <div class="answer-form">
    <div class="input">
      <input
        class="answer-input"
        type="text"
        autocomplete="off"
        placeholder="Your answer"
        ref="answer"
        :value="value"
        @keyup.enter="sendAnswer"
        @input="updateInputValue($event.target.value)"
      />
    </div>
    <button @click="sendAnswer">Answer</button>
  </div>
</template>

<script>
export default {
  props: {
    handler: Function,
    value: String
  },
  methods: {
    sendAnswer() {
      this.$props.handler(this.$props.value);
      this.$refs.answer.focus();
    },
    updateInputValue (value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/globalStyles/colorStyles';

.answer-form {
  width: 240px;
}

.input {
  box-sizing: border-box;
  .answer-input {
    box-sizing: border-box;
    font-size: 18px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: none;
    border-radius: 8px;
    padding: 6px 8px;
    &:focus {
      outline: none;
      transition: border-color 0.2s ease-in-out;
      border: 1px solid $Bluewood;
      &::placeholder {
        color: #e7e7e7;
        transition: color 0.4s ease-in-out;
      }
    }
    &:not(:focus) {
      outline: none;
      transition: border-color 0.4s ease-in-out;
      border: 1px solid #adadad;
      &::placeholder {
        color: #bbbbbb;
        transition: color 0.4s ease-in-out;
      }
    }
  }
}

button {
  margin-top: 12px;
  width: 100%;
}
</style>
