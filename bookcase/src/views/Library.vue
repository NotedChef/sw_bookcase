<template>
  <div>
    <label for="category" class="mr-3">Book categories:</label>
    <select
      name
      id="categories"
      @change="load()"
      v-model="currentCategory"
      class="mt-1 w-1/5 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>
    <div>
      <span>Shelf Size: {{ shelfSize }}</span>
    </div>
    <div class="flex flex-wrap justify-center" v-if="!isLoading">
      <div class="book-item flex flex-col justify-between" v-for="book in books" :key="book.key">
        <book :book="book"></book>
        <div class="flex flex-col">
          <div class="self-center justify-self-end">
            <button
              v-if="!isBookOnShelf(book)"
              class="btn btn-add"
               @click="add(book)"
            >Add to Shelf</button>
            <button
              v-else
              @click="remove(book)"
              class="btn btn-remove"
               >Remove from Shelf</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { Work } from "../models/books";
import store from "../store";
import Book from "../components/book.vue";

export default defineComponent({
  components: {
    Book
  },
  setup() {
    const books = computed(() => store.state.bookList);
    const shelfSize = computed(() => store.state.shelf.length);
    const isLoading = computed(() => store.state.isBusy);
    const categories = [
      { id: "science_fiction", name: "Science Fiction" },
      { id: "love", name: "Love Stories" },
      { id: "biography", name: "Biographies" },
      { id: "science", name: "Science" },
      { id: "technology", name: "Technology" },
      { id: "sports", name: "Sport" },
    ];

    const currentCategory = ref(store.state.currentCategory)

    onMounted(async () => {
      await load();
    });

    async function load() {
      store.dispatch("loadBooklist", currentCategory.value);
    }

    function remove(book: Work) {
      store.dispatch("removeBookFromShelf", book);
    }

    function isBookOnShelf(book: Work) {
      const result = store.state.shelf.findIndex((w) => w.cover_edition_key === book.cover_edition_key);
      return result > -1;
    }

    function add(book: Work) {
      store.dispatch("addBookToShelf", book);
    }

    return {
      books,
      categories,
      load,
      add,
      remove,
      isBookOnShelf,
      currentCategory,
      shelfSize,
      isLoading
    };
  },
});
</script>

<style scoped>
</style>

