import axios from "axios";
import BASE_URL from "../config";

const api = axios.create({
    baseURL: BASE_URL
});
let setShowError;
let setErrorMessage;
export const handleError = (showError, errorMessage) => {
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
export default class PointService {

    static async getGroupsPoints(){
        return api.get(`/api`)
    }

    static async getGroupsByIds(ids){
        return ids.length > 0
            ? api.get(`/api/ids?ids=${ids}`)
            : [];
    }
    static async getGroupById(id){
        return api.get(`/api/${id}`);
    }

    static async updateRoutePoint(id, point){
        return api.patch(`/api/route-point/${id}`,point)
    }

    static async updatePoint(id, point) {
        return api.patch(`/api/point/${point.id}`, point);
    }
}