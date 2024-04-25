import API from "@/api/Api.js";

export class BaseRepository {
    async index(filter = '') {
        try {
            return await API.get(filter);
        } catch (error) {
            throw new Error('Failed to fetch data from server');
        }
    }
    async post(filter = '', data) {
        try {
            return await API.post(filter, data);
        } catch (error){
            throw new Error('Failed to fetch data from server');
        }
    }
}
