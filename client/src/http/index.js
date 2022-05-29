import axios from "axios";

// Используем библеотеку axios для работы с запросами к серверу, установим методы, и хранение локальных файлов поддержки функционала (jwt)

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
