import { api } from "./api";

const url = 'https://dummyjson.com/comments'

export const CommentsServise = {
    getAll(){
        return api.get(url)
    }
}