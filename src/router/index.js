import Vue from 'vue';
import Router from 'vue-router';
import Tasks from '@/components/Tasks';
import Task from '@/components/Task';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tasks',
      component: Tasks,
    },
    {
        path: '/task/:id',
        name: 'Task',
        component: Task,
        props: true
      },
  ],
  mode: 'history',
});