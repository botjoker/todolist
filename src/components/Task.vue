<template>
  <div class="task-detail">
    <a href="/" class="back-link">Назад</a>
    <h2 class="tast-detail__title">
      {{task[0]['title']}}
      <div class="task-detail__controls">
        <div class="task-detail__remove" @click="removeTaskModal()" >
          <img src="/img/trash-icon.svg" />
        </div>
        <a class="task-detail__edit" @click="changeTaskModal()" >
          <img src="/img/edit-icon.svg" />
        </a> 
      </div>
    </h2>    
    <div v-if="todos.length > 0" class="task-detail__todos-wrapper">
      <div  class="task-detail__todos" v-for="item in todos" :key="item.id">            
        <div class="task-detail__todos-item">
          <div class="task-detail__todos-item-status" @click="changeTodoStatus(item.id, item.done)">
            <img v-if="item.done" src="/img/check-icon.svg" />
          </div>
          {{ item.title }}
          <div class="task-detail__todos-item-controls">
            <div class="task-detail__todos-item-remove" @click="removeTodoModal(item.id)">
              <img src="/img/trash-icon.svg" />
            </div>
            <a class="task-detail__todos-item-edit" @click="changeTodoModal(item.id)">
              <img src="/img/edit-icon.svg" />
            </a> 
          </div>
        </div>
      </div>
    </div>
    <div class="todos-add">
      <input type="text" v-model="newTodo" placeholder="Добавьте дело" />
      <button class="btn" @click="addTodo()">Добавить</button>
    </div>
    <Modal v-if="showModal1" @close="showModal1 = false">
      <span slot="header">Внимание</span>
      <span slot="body">Вы уверены, что хотите удалить?</span>
      <div slot="footer">
        <button class="btn btn--red" @click="this.removeTodo">Да</button>
        <button class="btn btn--green" @click="showModal1 = false">Нет</button>
      </div>
    </Modal>
    <Modal v-if="showModal2" @close="showModal2 = false">
      <span slot="header">Внимание</span>
      <span slot="body">Вы уверены, что хотите удалить задачу?</span>
      <div slot="footer">
        <button class="btn btn--red" @click="this.removeTask">Да</button>
        <button class="btn btn--green" @click="showModal2 = false">Нет</button>
      </div>
    </Modal>
    <Modal v-if="showModal3" @close="showModal3 = false">
      <span slot="header">Измениять название задачи</span>
      <span slot="body">
        <input type="text" v-model="changingTaskTitle" />
      </span>
      <div slot="footer">
        <button class="btn btn--red" @click="this.saveTask">Да</button>
        <button class="btn btn--green" @click="showModal3 = false">Нет</button>
      </div>
    </Modal>
    <Modal v-if="showModal4" @close="showModal4 = false">
      <span slot="header">Измениять название Todo</span>
      <span slot="body">
        <input type="text" v-model="changingTodoText" />
      </span>
      <div slot="footer">
        <button class="btn btn--red" @click="this.saveTodo">Да</button>
        <button class="btn btn--green" @click="showModal4 = false">Нет</button>
      </div>
    </Modal>
  </div>
</template>

<script>

import axios from 'axios';
import Modal from '@/components/Modal'

export default {
  name: 'Task',
  props: ['id'],
  data() {
    return {
        task: [],
        todos: [],
        newTodo: '',
        selectedTodo: '',
        changingTaskTitle: '',
        changingTodoText: '',
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    };
  },
  components: {
    Modal
  },
  methods: {
    getTask() {   // Get tasks list from server
      const path = 'http://test.botjoker.ru/task/'+this.id;
      axios.get(path)
        .then((res) => {
          this.task = res.data;
        })
        .catch((error) => {          
          console.error(error);
        });
    },
     getTodos() {   // Get todos list of current task from server
      const path = 'http://test.botjoker.ru/todos/'+this.id;
      axios.get(path)
        .then((res) => {
          this.todos = res.data;
        })
        .catch((error) => {          
          console.error(error);
        });
    },
    addTodo() {     // Add todo to server
      const path = 'http://test.botjoker.ru/add-todo/';
      axios.post(path, {
          task_id: this.id,
          text: this.newTodo
        })
        .then(() => {          
          this.newTodo = '';
          this.getTodos();
        })
        .catch((error) => {          
          console.error(error);
      });
    },
    changeTodoStatus(todo_id, todo_done) {  // Change todo record on server
      const path = 'http://test.botjoker.ru/change-todo-status/';
      
      axios.post(path, {
          todo_id: todo_id,
          done: todo_done ? 0 : 1
        })
        .then(() => {          
          this.newTodo = '';
          this.getTodos();
        })
        .catch((error) => {          
          console.error(error);
      });
    },
    eraseTodo(id) {      // Delete todo item from server by id
      const path = 'http://test.botjoker.ru/remove-todo/'+id;
      axios.get(path)
        .then((res) => {
          console.log(res);
          this.getTodos();
        })
        .catch((error) => {          
          console.error(error);
        });
    },
    eraseTask() {         // Delete task from server by id
      const path = 'http://test.botjoker.ru/remove-task/'+this.id;
      axios.get(path)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {          
          console.error(error);
        });
    },
    changeTaskTitle(task_id, task_title) {      // Change task title from server by id
      const path = 'http://test.botjoker.ru/change-task-title/';
      
      axios.post(path, {
          task_id: task_id,
          task_title: task_title
        })
        .then(() => {          
          this.newTodo = '';
          this.getTask();
        })
        .catch((error) => {          
          console.error(error);
      });
    },
    changeTodo(todo_id, todo_text) {       // Change todo text on server
      const path = 'http://test.botjoker.ru/change-todo/';
      
      axios.post(path, {
          todo_id,
          todo_text
        })
        .then(() => {          
          this.getTodos();
        })
        .catch((error) => {          
          console.error(error);
      });
    },
    removeTodoModal(id) {     // Open todo delete Confirmation window
      this.showModal1 = true;
      this.selectedTodo = id;
    },
    removeTodo() {            // Remove todo and close window
      this.eraseTodo(this.selectedTodo);
      this.selectedTask = null;
      this.showModal1 = false;
    },
    removeTaskModal() {       // Close Task delete confirmation window
      this.showModal2 = true;
    },
    removeTask() {            // Remove Task and go to frontpage
      this.eraseTask(this.selectedTodo);
      this.$router.push('/');
    },
    changeTaskModal() {    // Show changing task window
      this.showModal3 = true;
    },
    saveTask() {             // Save task changes and close window
      this.changeTaskTitle(this.id, this.changingTaskTitle);
      this.getTask();
      this.changingTaskTitle = '';
      this.showModal3 = false;
    },
    changeTodoModal(id) {     // Open todo changing modal
      this.selectedTodo = id;
      this.showModal4 = true;
    },
    saveTodo() {             // Save todo changes and close window
      this.changeTodo(this.selectedTodo, this.changingTodoText);
      this.getTodos();
      this.selectedTodo = null;
      this.changingTodoText = '';
      this.showModal4 = false;
    },
  },
  created() {
    this.getTask();
    this.getTodos();
  },
};
</script>


<style scoped>
.back-link {
  color: #000;
  display: inline-block;
  padding-top: 20px;
}

.task-detail {
  border: 1px solid #CCC;
  background: #FDFDFD;
  padding: 0 20px 20px;
}

.task-detail__controls {
  float: right;
}

.task-detail__remove {
  cursor: pointer;
  display: inline-block;
}

.task-detail__remove img {
  width: 15px;
}

.task-detail__edit {
  cursor: pointer;
  display: inline-block;
  margin-left: 10px;
}

.task-detail__edit img {
  width: 20px;
}

.task-detail__todos-item-status {
  width: 20px;
  height: 20px;
  border: 1px solid #6EA658;
  text-align: center;
  display: inline-block;
  padding-top: 2px;
  border-radius: 3px;
  position: relative;
  top: 2px;
  cursor: pointer;
}

.task-detail__todos-item-status img {
  width: 15px;
}

.task-detail__todos-item-controls {
  float: right;
}

.task-detail__todos-item-remove {
  cursor: pointer;
  display: inline-block;
}
.task-detail__todos-item-remove img {
  width: 15px;
}
.task-detail__todos-item-edit {
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
}
.task-detail__todos-item-edit img {
  width: 20px;
}
.todos-add {
  padding: 20px 0 20px;
}
.todos-add input[type="text"] {
  display: inline-block;
  margin-right: 20px;
  width: 74%;
  margin-bottom: 11px;
  position: relative;
  top: -2px;
}

</style>
