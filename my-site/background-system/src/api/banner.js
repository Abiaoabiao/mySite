//首页标语
import request from '@/utils/request'

// 获取
export function getBanner() {
    return request({
        url: '/api/banner',
        method: 'get'
    })
}
// 设置
export function setBanner(data) {
    return request({
        url: '/api/banner',
        method: 'post',
        data
    })
}
