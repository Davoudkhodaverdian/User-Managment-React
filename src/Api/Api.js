import axios from "axios";


const instance = axios.create({
    baseURL: "https://62891163abc3b5e327cc086b.endapi.io/users"
});

export default instance;