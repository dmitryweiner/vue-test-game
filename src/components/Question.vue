<template>
  <div>
    {{ question.firstOperand }}
    {{ question.operator }}
    {{ question.secondOperand }} = ?
  </div>
</template>

<script>
export default {
  props: ['question']
};
</script>
