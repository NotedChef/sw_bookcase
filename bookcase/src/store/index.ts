import { Work, Book } from './../models/books';
import { createStore } from "vuex";
import { loadBooksByCategory, loadShelf, loadWork } from '../http/bookapi';
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
            if (!state.shelf.find(w => w.cover_edition_key === book.cover_edition_key))
                state.shelf.push(book)
        },
        removeFromShelf: (state, book: Work) => {
            const removeIndex = state.shelf.map(w => w.cover_edition_key).indexOf(book.cover_edition_key);
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
        },
        async loadShelf({state, commit}) {
            commit("setError", "");
            commit("setIsBusy");
            try {
                const results = await loadShelf();
                if (results) {
                    for (let x = 0; x <results.length; ++x) {
                        const book = await loadWork(results[x]);
                        if (book) {

                            // Book api model is different to the work api model, so map the book model into the work model
                            const key = book.key.split('/').pop();
                            const cover_id = book.cover['small'].split('/').pop().split('-')[0];

                            // Made some of the properties of the work model optional
                            // Only the required properties need to be mapped
                            // The work.cover_edition_key rather than work.key is being used as the key
                            //   because cover_edition_key is used as a key in both the work and book model in OpenLibrary
                            const work: Work = {
                                title: book.title,
                                cover_edition_key: key,
                                cover_id: cover_id,
                                subject: book.subjects,
                                authors: book.authors
                            };
                            commit("addToShelf", work)
                        }
                    }
                }
                else commit("setError", "Failed to load the shelf");
            } catch (error) {
                commit("setError", "Unexpected error occurred while loading shelf")
            } finally {
                commit("clearIsBusy")
            }
        }
    }
});