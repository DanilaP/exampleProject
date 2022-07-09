import axios from "axios";

export default class AuthService {
    async login(email, password) {
        return axios.post('https://meetins.herokuapp.com/auth/login', {email, password})
    }
    async registration(email, password) {
        return axios.post('https://meetins.herokuapp.com/auth/registration', {email, password})
    }
}