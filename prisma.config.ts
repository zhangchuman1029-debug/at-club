import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // 关键：在这里定义连接字符串
    url: 'file:./prisma/dev.db',
  },
})