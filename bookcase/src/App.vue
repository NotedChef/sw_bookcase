<template>
  <div class="container mx-auto bg-white p-2 pl-5 font-sans">
    <header>
      <h1>Bookcase App</h1>
      <ul class="flex list-none ml-0 pl-0 mt-0 mb-10">
        <li class="ml-0 mx-1">
          <router-link to="/" class="btn">Bookshelf</router-link>
        </li>
        <li class="ml-0 mx-1">
          <router-link to="/add" class="btn">Library</router-link>
        </li>
      </ul>
    </header>

    <div class="text-lg text-yellow-600" v-if="isBusy">Loading...</div>
    <div class="text-lg text-red-600" v-if="error">Loading...</div>
  <router-view></router-view>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import store from  "./store";

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const isBusy = computed(() => store.state.isBusy);
    const error = computed(() => store.state.error);

    onMounted(() => store.dispatch("loadShelf"));

    return {
        isBusy,
        error
    }
  }
})

</script>




