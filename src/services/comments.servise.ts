import { api } from "./api";

const url = 'https://dummyjson.com/comments?limit=0'

export const CommentsServise = {
    getAll(){
        return api.get(url)
    }
}