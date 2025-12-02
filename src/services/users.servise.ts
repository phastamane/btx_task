import { api } from "./api"

const url = 'https://dummyjson.com/users?limit=0'
export const UsersService = {
    getAll(){
        return api.get(url)
    }
}