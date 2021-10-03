import { Response, Book } from './../models/books';
import axios from "axios";
import { HttpError } from './../models/httpError';

export async function loadBooksByCategory(category: string) {
    const url = `https://openlibrary.org/subjects/${category}.json`;
    const result = await axios.get<Response>(url);
    if (result.status === 200) {
        return result.data.works;
    }
    return null;
}

export async function loadShelf() {
    const url = 'http://localhost:5126/shelf';
    const result = await axios.get<String[]>(url);
    if (result.status === 200) {
        return result.data;
    }
    return undefined;
}

export async function loadWork(cover_edition_key: String) {
    const url = `https://openlibrary.org/api/books?bibkeys=${cover_edition_key}&jscmd=data&format=json`;
    const work = await axios.get<any>(url);
    var book = work.data[cover_edition_key as string] as Book;

    if (book)
        return book;

    return undefined;
}
