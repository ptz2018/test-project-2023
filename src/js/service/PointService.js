import axios from "axios";
import BASE_URL from "../config";

export default class PointService {

    static async getGroupsPoints(){
        return axios.get(`${BASE_URL}/api`)
            .then(response=>response.data)
            .catch(error=>{throw new Error(error.response.data)})
    }
}