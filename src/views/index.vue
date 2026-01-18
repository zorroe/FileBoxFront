<template>
    <div class="w-full max-w-md relative z-10">
        <el-card >
            <template #header>
                <div class="items-center justify-center flex text-2xl font-semibold">
                    <span>文件柜 - FileBox</span>
                </div>
            </template>
            <el-upload class="upload-demo" drag :auto-upload="false" :show-file-list="false" :file-list="fileList"
                :limit="1" :on-change="handleChange">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    {{ selectedFile ? selectedFile.name : '未选择文件' }}
                </div>
            </el-upload>
            <el-progress v-if="percent" :percentage="percent" :show-text="false" />
            <template #footer>
                <el-form style="max-width: 600px" :model="expireForm" label-width="auto" label-position="top"
                    size="large">
                    <el-form-item label="过期时间">
                        <div class="flex max-w-full">
                            <el-input-number v-model="expireForm.expireValue" :min="1" :max="30"
                                controls-position="right" style="width: 420px" />
                            <el-select v-model="expireForm.expireStyle" placeholder="Select" style="width: 240px">
                                <el-option v-for="option in expireStyleOptions" :key="option.value"
                                    :label="option.label" :value="option.value" />
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="下载次数">
                        <el-input-number v-model="expireForm.maxDownloadCount" :min="1" :max="5"
                            controls-position="right" style="width: 420px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleUpload" class="w-full">
                            上传<el-icon class="el-icon--right">
                                <Upload />
                            </el-icon>
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link @click="router.push('/fetch')" type="primary">已有取件码？点击这里</el-link>
                    </el-form-item>
                </el-form>
            </template>
        </el-card>
        <el-dialog v-model="codeVisible" title="取件码" width="500">
            <span>上传成功！取件码：<span class="font-bold">{{ code }}</span></span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCopyCode" type="primary">复制</el-button>
                    <el-button @click="handleCodeClose" plain>关闭</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { UploadFilled, Upload } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import request from '@/utils/requests'

const router = useRouter()

const expireStyleOptions = [
    { value: 'minutes', label: '分钟' },
    { value: 'hours', label: '小时' },
    { value: 'days', label: '天' },
    { value: 'weeks', label: '周' },
    { value: 'months', label: '月' },
    { value: 'years', label: '年' },
]

const expireForm = ref({
    maxDownloadCount: 10,
    expireValue: 1,
    expireStyle: 'days',
})

const codeVisible = ref(false)
const fileName = ref('')
const code = ref('')
const selectedFile = ref<File | null>(null)
const fileList = ref<UploadFile[]>([])
const percent = ref(0)

// 处理文件选择变化
const handleChange = (file: UploadFile, fileListParam: UploadFile[]) => {
    selectedFile.value = file.raw as File
    fileList.value = fileListParam.slice(-1) // 只保留最后一个文件
}

// 手动上传函数
const handleUpload = async () => {
    if (!selectedFile.value) {
        ElMessage.warning('请先选择文件')
        return
    }

    fileName.value = selectedFile.value.name
    const formData = new FormData()
    formData.append('file', selectedFile.value) // key 名根据后端要求调整，如 'avatar', 'document' 等

    try {
        code.value = await request.post('/file/upload', formData, {
            params: {
                maxDownloadCount: expireForm.value.maxDownloadCount,
                expireValue: expireForm.value.expireValue,
                expireStyle: expireForm.value.expireStyle
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                percent.value = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
                console.log('上传进度:', percent.value + '%')
            },
            timeout: 0, // 禁用超时
        })
        selectedFile.value = null
        fileList.value = []
        codeVisible.value = true
    } catch (error: any) {
        ElMessage.error('上传失败：' + (error.message || '未知错误'))
    }
}

const handleCopyCode = () => {
    const text = `文件名：${fileName.value}\n取件码：${code.value}\n取件地址：${window.location.origin}`
    navigator.clipboard.writeText(text).then(() => {
        ElMessage.success('取件码已复制到剪贴板')
    }).catch(() => {
        ElMessage.error('复制取件码失败')
    })
}

const handleCodeClose = () => {
    console.log('关闭取件码对话框')
    codeVisible.value = false
    fileName.value = ''
    percent.value = 0
}

</script>

<style scoped></style>
