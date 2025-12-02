export const api = {
   async get(url: string){
       const res = await fetch(url)
       if (!res.ok){
            return new Error('API error')
       }
       else return await res.json()
    }
}