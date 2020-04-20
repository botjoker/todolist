<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    outline: none;
  }
  .container {
    width: 600px;
    margin: 50px auto 0;
  }  
  .btn {
    background: #407AD5;
    border: none;
    cursor: pointer;
    padding: 5px 20px;
    color: #FFF;
    font-size: 16px;
    margin-right: 10px;
    border-radius: 5px;
    outline: none;
  }
  .btn:hover {
    opacity: 0.8;
  }
  .btn--red {
    background: #8A0309;
  }
  .btn--green {
    background: #138B8B; 
  }
  input[type="text"] {
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #000;
    padding: 5px 10px;
    height: 28px;
    font-size: 18px;
  }
</style>
