import { request } from '@/utils/request'

export class UserService{
    static async login(params: object) {
        return request('/login', params, 'post')
    }
}