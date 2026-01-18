<template>
  <el-config-provider :locale="zhCn">
    <el-container>
      <el-header class="flex items-center justify-end px-4">
        <el-button @click="toggleDark()" circle class="mr-2">
          <el-icon v-if="isDark">
            <Sunny />
          </el-icon>
          <el-icon v-else>
            <Moon />
          </el-icon>
        </el-button>
      </el-header>
      <el-main>
        <div class="flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<style scoped></style>