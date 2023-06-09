import axios from 'axios'
import Cookies from 'js-cookie';
const csrfToken = Cookies.get('XSRF-TOKEN');
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': csrfToken,
    },
});

