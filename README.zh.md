# Time Service

[![npm version](https://img.shields.io/npm/v/@qiyuey/time-service.svg)](https://www.npmjs.com/package/@qiyuey/time-service)
[![npm downloads](https://img.shields.io/npm/dm/@qiyuey/time-service.svg)](https://www.npmjs.com/package/@qiyuey/time-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/qiyuey/time-service?style=social)](https://github.com/qiyuey/time-service)
[![CI Status](https://github.com/qiyuey/time-service/actions/workflows/publish.yml/badge.svg)](https://github.com/qiyuey/time-service/actions)

[English](README.md) | [中文](README.zh.md)

> 🌍 最全面的时间处理 MCP 服务器 - 超越简单的时区转换

**Time Service** 是一个强大的模型上下文协议（MCP）服务器，为你的 AI 助手带来企业级时间处理能力。提供 **8 个专业工具**，远超基础时区查询，解决真实世界中的日程安排、时间计算和业务时间处理挑战。

**快速链接：**
📦 [npm 包](https://www.npmjs.com/package/@qiyuey/time-service) •
🐙 [GitHub](https://github.com/qiyuey/time-service) •
📝 [更新日志](https://github.com/qiyuey/time-service/releases) •
📖 [MCP 文档](https://modelcontextprotocol.io)

---

## ✨ 为什么选择 Time Service？

### 🎯 完整解决方案

**Time Service 提供 8 个全面的工具**，覆盖所有时间处理场景：

- ✅ **时间查询** - 当前时间、时间戳、多时区
- ✅ **时间计算** - 加减时间、计算时间差
- ✅ **时区操作** - 任意时区间转换
- ✅ **业务场景** - 计算工作日、查找下次出现时间

### 🚀 核心特性

**🔄 批量操作**
一次调用查询多个时区 - 减少 API 请求，快速获得全球时间概览：

```text
一次调用 → 获取所有时区及 UTC 偏移
```

**📅 工作日智能计算**
计算截止日期时自动跳过周末 - 非常适合项目管理：

```text
"从今天开始加 5 个工作日" → 自动排除周末
```

**⏰ 智能调度**
灵活条件查找下次出现时间：

```text
"下周一下午 2 点" ✓
"下个月 15 号" ✓
"下周五 14:00" ✓
```

**🎨 灵活格式化**
4 种内置格式加自定义配置：

- ISO 8601: `2024-01-15T10:30:00Z`
- Unix 时间戳: `1705315800`
- 人类可读: `Monday, January 15, 2024 at 10:30:00 AM`
- 自定义: 任何你需要的格式

### 💪 生产就绪

- ✅ **100% 测试覆盖** - 115 个全面的测试用例
- ✅ **完整类型** - 完整的 TypeScript 类型系统
- ✅ **文档完善** - 清晰的示例和指南
- ✅ **零安装** - 直接使用 npx/bunx

---

## 🛠️ 可用工具

| 工具 | 功能 | 使用场景 |
|------|------|----------|
| **get_current_time** | 获取任意格式/时区的当前时间 | 跨时区查看时间 |
| **get_timestamp** | 获取 Unix 时间戳（秒/毫秒） | 为 API 生成时间戳 |
| **add_time** | 加减时间段 | "3 天后是什么时间？" |
| **time_diff** | 计算时间差 | "距离截止日期还有多少小时？" |
| **convert_timezone** | 时区间转换 | "纽约 9 点是东京几点？" |
| **get_multiple_timezones** | 一次获取多个时区的时间 | 显示世界时钟 |
| **get_business_days** | 计算工作日（跳过周末） | 项目截止日期计算 |
| **next_occurrence** | 查找下次特定日期/时间 | "下周一是几号？"、"下个 15 号？" |

---

## 📦 安装

### 快速开始（无需安装）

添加到你的 MCP 客户端配置：

```json
{
  "mcpServers": {
    "time-service": {
      "command": "npx",
      "args": ["-y", "@qiyuey/time-service"]
    }
  }
}
```

### 备选方案：全局安装

```bash
npm install -g @qiyuey/time-service
```

然后配置：

```json
{
  "mcpServers": {
    "time-service": {
      "command": "time-service"
    }
  }
}
```

**支持的运行时：** npm (Node.js)、bun

---

## 🎯 使用示例

### 真实场景

**场景 1：全球团队协作**

```text
用户："我们在纽约、伦敦和东京的办公室现在分别是几点？"

Time Service：使用 get_multiple_timezones
→ 一次返回三个时区的时间和 UTC 偏移
```

**场景 2：项目截止日期计算**

```text
用户："如果从今天开始，10 个工作日后是哪天？"

Time Service：使用 get_business_days
→ 自动跳过周末，返回精确日期
```

**场景 3：会议安排**

```text
用户："东部时间下午 2 点转换成东京时间是几点？"

Time Service：使用 convert_timezone
→ 自动处理夏令时
```

**场景 4：周期性活动规划**

```text
用户："下周一早上 9 点是什么时候？"

Time Service：使用 next_occurrence
→ 找到精确的日期和时间
```

### API 示例

**获取多个时区的时间：**

```json
{
  "name": "get_multiple_timezones",
  "arguments": {
    "timezones": ["America/New_York", "Europe/London", "Asia/Tokyo"],
    "format": "readable"
  }
}
```

**计算工作日：**

```json
{
  "name": "get_business_days",
  "arguments": {
    "startDate": "2024-01-15T00:00:00Z",
    "days": 5,
    "excludeWeekends": true
  }
}
```

**查找下次出现时间：**

```json
{
  "name": "next_occurrence",
  "arguments": {
    "dayOfWeek": 1,
    "time": "14:00"
  }
}
```

---

## 🗺️ 路线图

### P0 - 核心改进 ✅

- ✅ **代码优化** (v0.3.1) - 提取共享工具，实现 100% 函数覆盖
- ✅ **全面测试** - 115 个测试用例覆盖所有场景

### P1 - 高优先级（即将推出）

- 📚 **增强文档** - 详细指南和教程
- 🐳 **Docker 支持** - 容器化部署就绪
- 🔌 **平台集成指南** - Claude Desktop、Zed、VS Code
- ⚡ **性能提升** - 缓存和优化

### P2 - 中等优先级（未来）

- 🌍 **国际化** - 多语言支持
- 📊 **高级计算** - 假期支持、工作时间
- 📈 **分析功能** - 使用统计和监控
- 🐍 **Python 版本** - 扩展到 Python 生态系统

### P3 - 长期愿景

- 🔄 **自动更新时区数据库** - 始终保持最新
- 🌐 **Web API 服务** - HTTP API 版本
- 🎨 **自定义假期日历** - 地区特定假期
- 🔗 **第三方集成** - 日历系统、项目管理工具

---

## 🤝 贡献

我们欢迎贡献！以下是你可以帮助的方式：

**优先领域：**

- 🐳 Docker 部署配置
- 📖 文档和集成指南  
- ✨ 新的时间计算功能
- 🚀 性能优化

**如何贡献：**

1. Fork 仓库
2. 创建你的功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交你的更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 开启一个 Pull Request

---

## 📚 资源

- 📦 [npm 包](https://www.npmjs.com/package/@qiyuey/time-service)
- 🐙 [GitHub 仓库](https://github.com/qiyuey/time-service)
- 📝 [发布说明](https://github.com/qiyuey/time-service/releases)
- 🐛 [问题跟踪](https://github.com/qiyuey/time-service/issues)
- 📖 [MCP 协议](https://modelcontextprotocol.io)
- 🤖 [Claude AI](https://claude.ai)

---

## 🙋 常见问题

**问：Time Service 有什么特别之处？**  
答：我们提供 **8 个全面的工具**，包括工作日计算、批量时区查询、智能时间查找和灵活格式化选项 - 满足所有时间处理需求的完整解决方案。

**问：需要安装什么吗？**  
答：不需要！在 MCP 配置中直接使用 `npx -y @qiyuey/time-service`。

**问：支持哪些时区？**  
答：所有 IANA 时区名称（例如 `America/New_York`、`Asia/Tokyo`、`Europe/London`）。

**问：可以使用自定义日期格式吗？**  
答：可以！支持 ISO、Unix、人类可读格式和自定义 Intl.DateTimeFormat 配置。

**问：生产环境可用吗？**  
答：绝对可以！100% 函数覆盖、115 个测试用例、完整类型支持，并持续维护。

---

## 📄 许可证

MIT © [qiyuey](https://github.com/qiyuey)

---

<div align="center">

**为 MCP 生态系统用心打造**

[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-black?logo=bun)](https://bun.sh)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green)](https://modelcontextprotocol.io)

⭐ **如果觉得有用，请在 GitHub 上给个星！** ⭐

</div>
