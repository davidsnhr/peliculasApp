import axios from 'axios';



const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '2fa455418efe0527d19a5bd6b67dc88c',
        language: 'es-ES'
    }
});

export default movieDB
