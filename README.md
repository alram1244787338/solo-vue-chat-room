# 聊天室 (Chat Room)

一个仿微信风格的纯前端聊天室，基于 Vue 3 + Vite 构建。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器访问
# http://localhost:5173
```

## 功能特性

- 📱 **多频道切换**：综合讨论、技术交流、随便聊聊，各频道消息独立存储
- 💬 **消息发送**：微信风格聊天气泡，自己的消息靠右绿色气泡，他人消息靠左白色气泡，显示发送者和时间
- 🌓 **深色 / 浅色主题**：一键切换，偏好自动保存到 `localStorage`，刷新不丢失
- ⌨️ **快捷键**：`Enter` 发送消息，`Shift + Enter` 换行
- 🏷️ **中文输入法兼容**：输入法组字（composition）过程中按 Enter 不会误触发发送
- 📦 **纯前端模拟**：无需后端，内置模拟用户和历史消息

## 技术栈

- **Vue 3** - Composition API + `<script setup>`
- **Vite** - 前端构建工具
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **SCSS** - CSS 预处理器
- **Vitest** - 单元测试

## 目录结构

```
src/
├── components/          # 组件
│   ├── ChatHeader.vue   # 聊天头部（频道名、操作按钮）
│   ├── ChatInput.vue    # 输入框（表情、发送按钮）
│   ├── ChatMessage.vue  # 聊天气泡
│   └── Sidebar.vue      # 左侧频道列表
├── composables/         # 组合式函数
│   ├── useChatInput.js  # 输入框逻辑（canSend、composition 状态机）
│   └── useMessages.js   # 消息逻辑（发送、频道过滤）
├── stores/              # Pinia 状态
│   ├── chat.js          # 聊天状态（频道、消息、用户）
│   └── theme.js         # 主题状态（持久化到 localStorage）
├── styles/              # 全局样式
│   ├── variables.scss   # 主题变量（仿微信色调）
│   ├── reset.scss       # CSS 重置
│   └── main.scss        # 主样式入口
├── utils/               # 工具函数
│   └── format.js        # formatTime 时间格式化
├── views/               # 页面视图
│   ├── Chat.vue         # 主聊天页
│   └── Settings.vue     # 设置页
├── router/
│   └── index.js         # 路由配置
├── App.vue
└── main.js
```

## 测试

```bash
# 运行所有单元测试
npm test
```

测试覆盖：

- **chat store**：`addMessage`（新建频道/追加）、`getMessages`（存在/不存在键）、`switchChannel`（相同频道 no-op、切换后消息正确）
- **formatTime**：正常时间戳、整数秒、零点时间、小时/分钟补零
- **useMessages**：`sendMessage` 正常发送、空内容不发送、自动 trim、频道隔离
- **useChatInput**：`canSend` 逻辑（有内容+非组字=true、空内容=false、组字中=false）、`startComposition` / `endComposition` 状态机
- **theme store**：`loadThemeFromStorage`（正常/损坏/空）、`toggleTheme`、localStorage 异常处理

共 5 个测试文件，62 个测试用例。

## 其他命令

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 说明

本项目为纯前端模拟，所有消息和用户数据均在前端生成，不依赖任何后端服务。
