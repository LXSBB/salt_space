import { request } from '@/utils/request'

export class ArticleInfoService{
    /*
    * 获取文章详情
    * */
    static async articlePreview(params: object) {
        return request('/article/preview', params, 'get')
    }
}