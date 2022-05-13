//验证码
import request from '@/utils/request'

export function getAbout() {
    return request({
        url: '/api/about',
        method: 'get'
    })
}
export function setAbout(site) {
    return request({
        url: '/api/about',
        method: 'post',
        data: {url: site}
    })
}
