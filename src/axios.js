import axios from "axios";

export function getAxiosInstance(baseURL) {
    return axios.create({
        baseURL,
    });
}
