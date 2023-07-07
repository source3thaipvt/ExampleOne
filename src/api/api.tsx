import axios from "axios"

class Api {
    async postLogin(username: string, password: string) {
        return await axios.post(
            'https://dummyjson.com/auth/login',
            {
                username,
                password
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
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
}
export default new Api()