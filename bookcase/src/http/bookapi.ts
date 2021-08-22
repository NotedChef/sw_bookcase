import { Response } from './../models/books';
import axios from "axios";
import { HttpError } from './../models/httpError';

export default async function(category: string) {
    const url = `https://openlibrary.org/subjects/${category}.json`;
    const result = await axios.get<Response>(url);
    if (result.status === 200) {
        return result.data.works;
    }
    return null;
    // return {
    //     status: result.status,
    //     errorMessage: result.statusText
    // } as HttpError
}
