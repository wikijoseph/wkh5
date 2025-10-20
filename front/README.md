# H5钱包应用

基于Vue3 + Pinia + Tailwind CSS构建的移动端数字钱包应用，采用OKX风格的黑色系界面设计。

## 功能特性

### 🔐 用户认证系统
- 支持多用户登录
- 每个用户独立的钱包和交易数据
- 路由守卫保护

### 💰 钱包管理
- 支持多钱包管理
- 前50币种支持（带logo显示）
- 实时余额显示
- 钱包添加/删除功能

### 📊 交易记录系统
- 每日自动生成随机交易记录
- 可配置日收益范围（如0.05%-0.07%）
- 可配置每日交易数量范围（如50-100条）
- 交易记录包含盈亏统计
- 支持发送/接收交易类型

### 📈 数据统计
- 实时盈亏统计图表
- 交易历史分析
- 收益率计算
- 盈利/亏损交易统计

### 🎨 界面设计
- OKX风格黑色系主题
- 响应式H5设计
- 现代化UI组件
- 流畅的动画效果

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **状态管理**: Pinia
- **样式框架**: Tailwind CSS
- **图表库**: Chart.js
- **构建工具**: Vite
- **路由**: Vue Router

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 测试账户

应用内置了两个测试账户：

1. **管理员账户**
   - 用户名: `admin`
   - 密码: `123456`
   - 日收益范围: 0.05% - 0.07%
   - 交易数量: 50-100条/天

2. **普通用户**
   - 用户名: `user1`
   - 密码: `password`
   - 日收益范围: 0.03% - 0.05%
   - 交易数量: 30-80条/天

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── AddWalletModal.vue
│   ├── ProfitLossChart.vue
│   ├── TransactionList.vue
│   └── WalletCard.vue
├── data/               # 静态数据
│   └── cryptoData.js   # 前50币种数据
├── stores/             # Pinia状态管理
│   ├── auth.js         # 用户认证
│   ├── transaction.js  # 交易数据
│   └── wallet.js       # 钱包数据
├── utils/              # 工具函数
│   └── transactionGenerator.js  # 交易生成器
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── Login.vue       # 登录页
│   ├── Settings.vue    # 设置页
│   └── WalletDetail.vue # 钱包详情
└── router/             # 路由配置
    └── index.js
```

## 核心功能说明

### 交易记录生成
- 每天自动为每个钱包生成随机交易记录
- 交易记录包含真实的盈亏数据
- 支持多种币种和交易类型
- 可配置收益范围和交易数量

### 数据持久化
- 使用localStorage存储用户数据
- 支持跨会话数据保持
- 自动生成历史交易数据

### 响应式设计
- 完美适配移动端设备
- 支持不同屏幕尺寸
- 触摸友好的交互设计

## 自定义配置

### 修改日收益范围
在设置页面可以调整：
- 日收益最小值/最大值
- 每日交易数量范围

### 添加新币种
在 `src/data/cryptoData.js` 中添加新的币种数据：
```javascript
{
  symbol: 'NEW',
  name: 'New Coin',
  logo: '🆕'
}
```

## 浏览器支持

- Chrome (推荐)
- Safari
- Firefox
- Edge

## 开发说明

### 添加新功能
1. 在对应的store中添加状态管理
2. 创建或更新相关组件
3. 更新路由配置（如需要）
4. 测试功能完整性

### 样式定制
所有样式都基于Tailwind CSS，可以在 `tailwind.config.js` 中自定义主题色彩。

## 许可证

MIT License
