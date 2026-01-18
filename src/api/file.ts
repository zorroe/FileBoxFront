import request from '@/utils/requests'

export const fetchFileInfo = (fileCode: string) => {
    return request.get(`/file/info/${fileCode}`)
}