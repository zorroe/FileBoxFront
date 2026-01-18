// src/utils/request.ts
import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 后端返回的数据结构（根据你的实际接口调整）
interface ResponseData<T = any> {
    code: number
    data: T
    message: string
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 使用 Vite 的环境变量
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error('请求拦截错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
        const res = response.data

        // 假设后端约定：code === 200 表示成功
        if (res.code === 200) {
            return res.data // 直接返回业务数据
        } else {
            // 业务逻辑错误（如 token 过期、参数错误等）
            console.error('业务错误:', res.message || '请求失败')
            ElMessage.error(res.message || '请求失败')
            return Promise.reject(new Error(res.message || '请求失败'))
        }
    },
    (error) => {
        let msg = '网络异常，请稍后再试'
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    msg = '未授权，请重新登录'
                    // 可在此处跳转到登录页，例如：
                    // router.replace('/login')
                    break
                case 403:
                    msg = '拒绝访问'
                    break
                case 404:
                    msg = '请求地址不存在'
                    break
                case 500:
                    msg = '服务器内部错误'
                    break
                default:
                    msg = `请求失败: ${error.response.status}`
            }
        }
        console.error('响应拦截错误:', msg)
        return Promise.reject(new Error(msg))
    }
)

export default service