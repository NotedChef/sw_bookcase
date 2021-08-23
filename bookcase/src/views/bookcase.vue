<template>
  <div class="">
    <h1 class="page-title">My Bookcase</h1>
    <label for="category" class="mr-3">Book categories:</label>
    <select
      name=""
      id="categories"
      @change="load(currentCategory)"
      v-model="currentCategory"
      class="
        mt-1
        w-1/5
        py-2
        px-3
        border border-gray-300
        bg-white
        rounded-md
        shadow-sm
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        sm:text-sm
      "
    >
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>
    {{shelfSize}}
    <div class="flex flex-wrap justify-center">
      <div class="book-item" v-for="book in books" :key="book.key">
        <img
          :src="`//covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`"
          :alt="book.title"
          class="min-w-full"
        />
        <div class="text-lg">{{ book.title }}</div>
        <div class="text-md font-light">{{ book.authors[0].name }}</div>
        <div><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="add(book)">Add to Shelf</button></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { Work } from "../models/books";
import store from "../store";

export default defineComponent({
  setup() {
    const books = computed(() => store.state.bookList);
    const shelfSize = computed(() => store.state.shelf.length);
    const categories = [
      { id: "science_fiction", name: "Science Fiction" },
      { id: "love", name: "Love Stories" },
      { id: "biography", name: "Biographies" },
      { id: "science", name: "Science" },
      { id: "technology", name: "Technology" },
    ];

    const currentCategory = ref("science_fiction");

    onMounted(async () => {
      await load("science_fiction");
    });

    async function load(category: string) {
      store.dispatch("loadBooklist", category);
    }

    function add(book: Work) {
      store.dispatch("addBookToShelf", book)
    }

    return {
      books,
      categories,
      load,
      add,
      currentCategory,
      shelfSize
    };
  },
});
</script>

