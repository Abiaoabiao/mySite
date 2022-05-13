//评论
import request from '@/utils/request'

// 获取全部
export function getComments(page = 1, limit = 10, id = -1) {
    return request({
        url: `/api/comment?page=${page}&limit=${limit}`,
        method: 'get',
        blogid: id
    })
}
// 获取单个文章评论
export function getComment(id) {
    return request({
        url: `/api/comment?blogid=${id}`,
        method: 'get',
    })
}

// 删除
export function delComment(id) {
    return request({
        url: `/api/comment/${id}`,
        method: 'delete',
    })
}
