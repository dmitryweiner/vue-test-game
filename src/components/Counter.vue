<template>
  <div>
    Таймер: {{time}}
  </div>
</template>
<script>

  const TICK = 1000;

  export default {
    props: [
      "amount", // in seconds
      "timeoutHandler", // callback
    ],
    data: () => ({
      time: 0
    }),
    created() {
      this.$data.time = this.$props.amount;
      this.timer = setTimeout(this.tick, TICK);
    },
    destroyed() {
      clearTimeout(this.timer);
    },
    methods: {
      tick() {
        this.$data.time -= TICK / 1000;
        if (this.$data.time > 0) {
          this.timer = setTimeout(this.tick, TICK);
        } else {
          this.$props.timeoutHandler();
        }
      }
    }
  };
</script>
