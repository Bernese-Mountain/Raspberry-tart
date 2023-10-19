<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted } from 'vue';
onMounted(() => {
  //实际开发过程中建议对api进行封装 搭配async/await使用
  axios
    .get(`/api/getUsers`)
    .then((res) => {
     console.log("res  ----->  ", res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

});

</script>