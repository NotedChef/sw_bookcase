<template>
    <img
        :src="`//covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`"
        :alt="book.title"
        class="min-w-full max-h-72"
    />
    <div class="flex flex-col">
        <div class="text-lg truncate">{{ book.title }}</div>
        <div class="text-md font-light">{{ book.authors[0].name }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Work } from "../models/books"

export default defineComponent({
    name: "Book",
    props: {
        book: {
            type: Object,
            required: true,
        }
    }

});

</script>