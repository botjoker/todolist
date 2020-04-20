<template>
  <transition name="modal-fade">
    <div class="modal">
      <div class="modal__header">
        <slot name="header">
          default header
        </slot>
      </div>
      <div class="modal__body">
        <slot name="body">
        </slot>
      </div>
      <div class="modal__footer">
        <slot name="footer">
          <button class="modal-default-button" @click="$emit('close')">
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Modal',
  props: ['id'],
  data() {
    return {
        showModal: false,
    };
  },
  methods: {
    getTask() {
    },
  },
  created() {
  },
};
</script>


<style scoped>
  .modal {
    width: 300px;
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #CCC;
    position: fixed;
    left: 50%;
    margin-left: -150px;
    top: 30%;
  }

  .modal__header {
    background: #FFF1CE;
    padding: 5px 20px;
    font-weight: bold;
  }
  
  .modal__body {
    background: #FFF;
    padding: 20px;
  }
  
  .modal__footer {
    border-top: 1px solid #CCC;
    padding: 10px 20px;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
