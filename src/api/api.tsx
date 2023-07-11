import axios from "axios"

const BaseURL = 'https://dummyjson.com/'
const configApi = {
    headers: { 'Content-Type': 'application/json' },
}
class Api {
    async postLogin(username: string, password: string) {
        return await axios.post(
            BaseURL + 'auth/login',
            {
                username,
                password
            },
            configApi
        )
            .then(function (response) {
                if (response.data) {
                    return response
                }
            })
            .catch(function (error) {
                if (error) {
                    return error
                }
            });
    }
    async getUser(userId: number | string) {
        return await axios.get(
            BaseURL + `users/${userId}`,
            configApi
        )
    }
    async getPost(limit: number, skip: number) {
        return await axios.get(
            BaseURL + `posts?limit=${limit}&skip=${skip}`,
            configApi
        )
    }
    async getSearchPost(text: string) {
        return await axios.get(
            BaseURL + `posts/search?q=${text}`,
            configApi
        )
    }
}
export default new Api()