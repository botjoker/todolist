<template>
  <div class="todos-wrapper">
    <div class="todos-list">
      <div class="todos-list__item" v-for="item in todos" :key="item.id">            
        <div class="todos-list__item-status">
          <img v-if="item.done" src="/img/check-icon.svg" />
        </div>
        {{ item.title }}
      </div>    
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

// import Modal from '@/components/Modal'

export default {
  name: 'Todos',
  props: {
    task: Number,
  },
  data() {
    return {
      todos: [],
    };
  },
  components: {
    // Modal
  },
  methods: {
    getTodos() {
      const path = 'http://test.botjoker.ru/todos/'+this.task;
      console.log(path);
      axios.get(path)
        .then((res) => {
          this.todos = res.data;
        })
        .catch((error) => {          
          console.error(error);
        });
    },
  },
  created() {
    this.getTodos();
  },
};


</script>


<style scoped>
  .todos-list {

  }
  .todos-list__item {
    font-size: 16px;
    margin-bottom: 5px;
    line-height: 1.1;
  }
  .todos-list__item-status {
    width: 20px;
    height: 20px;
    border: 1px solid #6EA658;
    text-align: center;
    display: inline-block;
    padding-top: 2px;
    border-radius: 3px;
    position: relative;
    top: 2px;
  }
  .todos-list__item-status img {
    width: 15px;
  }
</style>
