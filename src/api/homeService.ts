import { request } from '@/utils/request'

export class HomeService{
    static async getArticleList(params: object) {
        return request('/article/list', params, 'get')
    }
    static async getLabelList(params='') {
        return request('/category/list',params, 'get')
    }
}