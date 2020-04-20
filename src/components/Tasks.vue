<template>
    <div class="tasks">
        <div class="tasks-add">
          <input type="text" v-model="newTask" placeholder="Добавьте новую задачу" />
          <button class="btn" @click="addTask()">Добавить</button>
        </div>
        <div class="tasks-list">
          <div class="tasks-list__item" v-for="item in tasks" :key="item.id">            
            <div class="tasks-list__item-controls">
              <div class="tasts-list__item-remove" @click="removeTaskModal(item.id)">
                <img src="/img/trash-icon.svg" />
              </div>
              <a class="tasks-list__item-edit" v-bind:href="'/task/'+item.id">
                  <img src="/img/edit-icon.svg" />
              </a>                
            </div>
            <div class="tasks-list__item-title"> {{ item.title }} </div>                
            <div class="tasks-list__item-todos">
              <Todos v-bind:task="item.id" />     
            </div>
          </div>
        </div>
        <Modal v-if="showModal" @close="showModal = false">
          <span slot="header">Внимание</span>
          <span slot="body">Вы уверены, что хотите удалить?</span>
          <div slot="footer">
            <button class="btn btn--red" @click="this.removeTask">Да</button>
            <button class="btn btn--green" @click="showModal = false">Нет</button>
          </div>
        </Modal>
    </div>
</template>

<script>

import axios from 'axios';
import Todos from '@/components/Todos'
import Modal from '@/components/Modal'

export default {
  name: 'Tasks',
  data() {
    return {
      appId: '',
      tasks: '',
      showModal: false,
      selectedTask: Number,
      newTask: '',
    };
  },
  components: {
    Todos, Modal
  },
  methods: {
    getTasks() {   // Get tasks list from server
      const path = 'http://test.botjoker.ru/tasks/'+this.appId;
      axios.get(path)
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((error) => {          
          console.error(error);
        });
    },
    eraseTask(id) {   // Erase task by id from server
      const path = 'http://test.botjoker.ru/remove-task/'+id;
      axios.get(path)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {          
          console.error(error);
        });
    },
    removeTaskModal(id) {    // Close Remove task Window
      this.showModal = true;
      this.selectedTask = id;
    },
    removeTask() {
      this.eraseTask(this.selectedTask);
      this.tasks = this.tasks.filter((element)=>element.id !== this.selectedTask);
      this.selectedTask = null;
      this.showModal = false;
    },
    addTask() {      // Add task to server
      const path = 'http://test.botjoker.ru/add-task/';
      axios.post(path, {
          user_id: this.appId,
          text: this.newTask
        })
        .then(() => {          
          this.newTask = '';
          this.getTasks();
        })
        .catch((error) => {          
          console.error(error);
      });
    }
  },
  created() {
    if (localStorage.appid) {
      this.appId = localStorage.appid;
    } else {
      localStorage.appid = Math.floor(new Date().valueOf() * Math.random());
    }
    this.getTasks();
  },
}
</script>


<style scoped>

.tasks-list__item {
  padding: 20px;
  border: 1px solid #CCC;
  margin-bottom: 20px;
  background: #FDFDFD;
  border-radius: 5px;
}

.tasks-list__item-title {
  font-size: 20px;
  font-weight: bold;
  max-width: 70%;
  margin-bottom: 10px;
  line-height: 1.2;
}

.tasks-list__item-controls {
  float: right;
}

.tasts-list__item-remove {
  cursor: pointer;
  display: inline-block;
}
.tasts-list__item-remove img {
  width: 15px;
}
.tasks-list__item-edit {
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
}
.tasks-list__item-edit img {
  width: 20px;
}
.tasks-add {
  padding: 20px;
}
.tasks-add input[type="text"] {
  display: inline-block;
  margin-right: 20px;
  width: 74%;
  margin-bottom: 11px;
  position: relative;
  top: -2px;
}

</style>
