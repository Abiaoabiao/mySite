//项目与demo
import request from '@/utils/request'

// 获取
export function getProject() {
    return request({
        url: '/api/project',
        method: 'get'
    })
}
// 新增
export function addProject(data) {
    return request({
        url: '/api/project',
        method: 'post',
        data
    })
}
// 修改
export function setProject(id,data) {
    return request({
        url: `/api/project/${id}`,
        method: 'put',
        data
    })
}
export function delProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: 'delete',
    })
}
