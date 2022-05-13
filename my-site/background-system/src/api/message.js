//验证码
import request from '@/utils/request'

export function getMessage(page = 1, limit = 5) {
    return request({
        url: `/api/message?page=${page}&limit=${limit}`,
        method: 'get',
    })
}
export function delMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: 'delete'
    })
}
