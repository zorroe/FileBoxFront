<template>
    <div class="w-full max-w-md relative z-10">
        <el-card>
            <template #header>
                <div class="items-center justify-center flex text-2xl font-semibold">
                    <span>文件柜 - FileBox</span>
                </div>
            </template>
            <el-form style="max-width: 600px" :model="fetchForm" label-width="auto" label-position="top" size="large">
                <el-form-item label="取件码">
                    <el-input v-model="fetchForm.code" style="width: 420px" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleFetch" class="w-full">
                        查询<el-icon class="el-icon--right">
                            <Search />
                        </el-icon>
                    </el-button>
                </el-form-item>
            </el-form>
            <div v-if="fileInfo">
                <el-descriptions :column="1" size="large">
                    <el-descriptions-item label="文件名">{{ fileInfo?.name }}</el-descriptions-item>
                    <el-descriptions-item label="文件大小">{{ fileInfo?.sizeStr }}</el-descriptions-item>
                    <el-descriptions-item label="上传时间">{{ fileInfo?.createTime }}</el-descriptions-item>
                    <el-descriptions-item label="到期时间">{{ fileInfo?.expireTime }}</el-descriptions-item>
                    <el-descriptions-item label="剩余下载次数">{{ fileInfo?.maxDownloadCount > 0 ? fileInfo?.maxDownloadCount
                        -
                        fileInfo?.downloadCount : '无限次' }}</el-descriptions-item>
                </el-descriptions>
                <el-button @click="handleDownload" type="primary" class="w-full" size="large"
                    :disabled="fileInfo.status != 'active'">
                    下载<el-icon>
                        <Download />
                    </el-icon>
                </el-button>
            </div>
            <template #footer>
                <el-link @click="router.push('/')" type="primary">需要发送文件？点击这里</el-link>
            </template>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { Download, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchFileInfo } from '@/api/file'

const router = useRouter()

const fetchForm = ref({
    code: '',
})

const fileInfo = ref<any>(null)

const handleFetch = async () => {
    fileInfo.value = null;
    fileInfo.value = await fetchFileInfo(fetchForm.value.code);
    console.log('文件信息：', fileInfo)
}

const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `${fileInfo.value.directLink}`
    link.click()
}

</script>

<style scoped></style>
