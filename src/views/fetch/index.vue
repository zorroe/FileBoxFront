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
            <template #footer>
            </template>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const fetchForm = ref({
    code: '',
})

const handleFetch = () => {
    console.log('取件码：', fetchForm.value)
}

</script>

<style scoped></style>
