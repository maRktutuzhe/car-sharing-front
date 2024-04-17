import axios from 'axios'

export class BaseRepository {
    constructor(token) {
        this.service = axios.create({
            baseURL: 'http://localhost:80/api/',
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                }
              : {},
          });
        }
    async index(filter = '') {
        try {
            const response = await this.service.get(filter);
            return response;
        } catch (error) {
            throw new Error('Failed to fetch data from server');
        }
    }
    async post(filter = '', data) {
        try {
            const response = await this.service.post(filter, data);
            return response;
        } catch (error){
            throw new Error('Failed to fetch data from server');
        }
    }
} 
