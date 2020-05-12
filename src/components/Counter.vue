<template>
  <div>
    Timer: {{time}}
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
    destroyed() {
      clearTimeout(this.timer);
    },
    created() {
      this.$parent.$on('start', this.start);
    },
    methods: {
      tick() {
        this.$data.time -= TICK / 1000;
        if (this.$data.time > 0) {
          this.timer = setTimeout(this.tick, TICK);
        } else {
          this.$props.timeoutHandler();
        }
      },
      start() {
        this.$data.time = this.$props.amount;
        this.timer = setTimeout(this.tick, TICK);
      },
    },
  };
</script>
