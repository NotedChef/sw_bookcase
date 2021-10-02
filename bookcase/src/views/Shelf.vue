<template>
    <h2>My Bookshelf</h2>
    <div class="flex flex-wrap justify-center">
        <div class="book-item flex flex-col justify-between" v-for="b in shelf" :key="b.key">
            <book :book="b"></book>
            <div>
                <button
                    v-if="isBookOnShelf(b)"
                    class="btn btn-remove"
                    @click="remove(b)"
                >Remove from shelf</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "../store";
import Book from "../components/book.vue"
import { Work } from "../models/books";

export default defineComponent({
    components: {
        Book
    },
    setup() {
        const shelf = ref(store.state.shelf);

        function remove(book: Work) {
            store.dispatch("removeBookFromShelf", book)
        }

        function isBookOnShelf(book: Work) {
            return store.state.shelf.find((w) => w.key === book.key);
        }

        return {
            shelf,
            remove,
            isBookOnShelf
        }
    },
});

</script>>