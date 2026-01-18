<template>
    <div class="w-full max-w-md relative z-10">
        <el-card>
            <template #header>
                <div class="items-center justify-center flex text-2xl font-semibold">
                    <span>文件柜 - FileBox</span>
                </div>
            </template>
            <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    点击或拖放文件到此处上传
                </div>
            </el-upload>
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
                        <el-input-number v-model="expireForm.maxDownloadCount" :min="1" :max="1000"
                            controls-position="right" style="width: 420px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleUpload" class="w-full">
                            上传<el-icon class="el-icon--right"><Upload /></el-icon>
                        </el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { UploadFilled, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'

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

const handleUpload = () => {
    console.log('上传文件，过期时间：', expireForm.value)
}

</script>

<style scoped></style>
