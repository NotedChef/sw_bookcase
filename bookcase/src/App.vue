<template>
  <div class="container mx-auto bg-white p-2 font-sans">
    <bookcase></bookcase>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import  bookcase from './views/bookcase.vue'

export default defineComponent({
  name: 'App',
  components: {
    bookcase
  }
})
</script>


