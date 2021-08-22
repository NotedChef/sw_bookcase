<template>
  <div class="container mx-auto bg-white p-2 font-sans">
    <div class="text-lg text-yellow-600" v-if="isBusy">Loading...</div>
    <div class="text-lg text-red-600" v-if="error">Loading...</div>
    <bookcase></bookcase>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import  bookcase from './views/bookcase.vue'
import store from  "./store";

export default defineComponent({
  name: 'App',
  components: {
    bookcase
  },
  setup() {
    const isBusy = computed(() => store.state.isBusy);
    const error = computed(() => store.state.error);

    return {
        isBusy,
        error
    }
  }
})
</script>


