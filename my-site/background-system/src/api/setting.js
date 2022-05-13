//评论
import request from '@/utils/request'

// 获取全部
export function getSetting() {
    return request({
        url: `/api/setting`,
        method: 'get',
    })
}
export function setSetting(data) {
    return request({
        url: `/api/setting`,
        method: 'put',
        data
    })
}
