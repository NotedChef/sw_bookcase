import { Work } from './../models/books';
import { createStore } from "vuex";
import { loadBooksByCategory } from '../http/bookapi';
import { ssrContextKey } from 'vue';

export default createStore({
    state: {
        bookList: Array<Work>(),
        shelf: new Array<Work>(),
        isBusy: false,
        currentCategory: "science_fiction",
        error: ""
    },
    mutations: {
        setBookList(state, list: Array<Work>) {
            state.bookList = list;
        },
        addToShelf: (state, book: Work) => {
            if (!state.shelf.find(w => w.key === book.key))
                state.shelf.push(book)
        },
        removeFromShelf: (state, book: Work) => {
            const removeIndex = state.shelf.map(w => w.key).indexOf(book.key);
            ~removeIndex && state.shelf.splice(removeIndex, 1);
        },
        setCurrentCategory: (state, category: string) => { state.currentCategory = category},
        setError: (state, error: string) => state.error = error,
        setIsBusy: (state) => state.isBusy = true,
        clearIsBusy: (state) => state.isBusy = false
    },
    actions: {
        async loadBooklist({ state, commit }, category: string) {
            if (state.currentCategory !== category || state.bookList.length === 0) {
                commit("setCurrentCategory", category);
                commit("setError", "");
                commit("setIsBusy");
                try {
                    const results = await loadBooksByCategory(category);
                    if (results) commit("setBookList", results);
                    else commit("setError", "Failed to load any books");
                } catch (error) {
                    commit("setError", "Unexpected error occurred while loading books")
                } finally {
                    commit("clearIsBusy")
                }
            }
        },
        addBookToShelf({ commit }, book: Work) {
            commit("addToShelf", book);
        },
        removeBookFromShelf({ commit }, book: Work) {
            commit("removeFromShelf", book);
        }
    }
});