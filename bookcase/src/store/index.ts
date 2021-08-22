import { Work } from './../models/books';
import { createStore } from "vuex";
import { loadBooksByCategory } from '../http/bookapi';
import { ssrContextKey } from 'vue';

export default createStore({
    state: {
        bookList: Array<Work>(),
        shelf: new Array<Work>(),
        isBusy: false,
        error: ""
    },
    mutations: {
        setBookList(state, list: Array<Work>) {
            state.bookList = list;
        },
        setError: (state, error: string) => state.error = error,
        setIsBusy: (state) => state.isBusy = true,
        clearIsBusy: (state) => state.isBusy = false
    },
    actions: {
        async loadBooklist({commit}, category: string) {
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
    }
});