import { api } from "./api";

const url = 'https://dummyjson.com/posts?limit=0'

export const PostService = {
    getAll(){
        return api.get(url)
    }
}