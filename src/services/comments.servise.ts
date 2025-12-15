import { api } from "./api";

const url = 'https://dummyjson.com/comments?limit=0'

export const CommentsServise = {
    getAll(){
        return api.get(url)
    },
    getPostComments(id: number){
        const URL_POST_COMMENTS = `https://dummyjson.com/comments/post/${id}`
        return api.get(URL_POST_COMMENTS)
    }
}