<template>
  <transition name="modal">
    <div class="modal-mask" v-show="show">
      <div class="modal-container-position">
        <div class="modal-container" @click.stop>
          <h1>Time is up! Next one will be better! 😘</h1>
          <button
            type="button"
            @click="close"
          >
            Try again! 🤟
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/globalStyles/buttonStyles';

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
  background: rgba(50, 58, 82, 0.35);
}

.modal-container-position {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
}

.modal-container {
  box-sizing: border-box;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  transition: all .3s ease;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
