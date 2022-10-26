import createAxios from "./createAxios";

export const baseUrl = 'https://api.themoviedb.org/3/'
export const apiKey = 'c32124e2da2fe228e1a6a1ad3f4447b8'

export const getLogin = (data) => {
    return createAxios.post(`${baseUrl}authentication/token/validate_with_login?api_key=${apiKey}`, data)
}