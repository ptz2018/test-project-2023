import axios from "axios";
import BASE_URL from "../config";

const api = axios.create({
    baseURL: BASE_URL
});
let setShowError;
let setErrorMessage;
export const handleMapError = (showError, errorMessage) => {
    setShowError = showError;
    setErrorMessage = errorMessage;
};
api.interceptors.response.use(
    response => response.data,
    error => {
        setShowError(true);
        setErrorMessage(error.response.data)
        throw new Error(error.response.data)
    }
);
export default class MapService {
    static async getMaps(){
    console.log(api.get(`/api/maps`))
        return api.get(`/api/maps`)
    }
}