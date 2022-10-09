import { request } from '@/utils/request'

export class CreateService{
    /*
    * 文件上传
    * */
    static async upload(params: object, cb: Function) {
        return request('/upload', params, 'post', cb)
    }
    /*
    * 创建文章
    * */
    static async createArticle(params: object) {
        return request('/article/create', params, 'post')
    }
}