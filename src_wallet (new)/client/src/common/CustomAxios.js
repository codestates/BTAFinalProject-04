import axios from "axios";

const APP_SERVER = 'http://localhost:3200/api'

export const customAxios = axios.create({
    // baseURL: `${process.env.REACT_APP_SERVER}`,
    baseURL: APP_SERVER,
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        withCredentials: true
    }
});

export default class CustomAxios {
    
    static async get(endPoint) {
        const result = await customAxios.get(endPoint);
        return result.data;
    }

}
