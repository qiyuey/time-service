# Time Service

[![npm version](https://img.shields.io/npm/v/@qiyuey/time-service.svg)](https://www.npmjs.com/package/@qiyuey/time-service)
[![npm downloads](https://img.shields.io/npm/dm/@qiyuey/time-service.svg)](https://www.npmjs.com/package/@qiyuey/time-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/qiyuey/time-service?style=social)](https://github.com/qiyuey/time-service)
[![CI Status](https://github.com/qiyuey/time-service/actions/workflows/publish.yml/badge.svg)](https://github.com/qiyuey/time-service/actions)

> 🌍 The most comprehensive time handling MCP server - Beyond simple timezone conversion

**Time Service** is a powerful Model Context Protocol (MCP) server that brings enterprise-grade time manipulation capabilities to your AI assistant. With **8 specialized tools**, it goes far beyond basic timezone queries to solve real-world scheduling, calculation, and business time challenges.

**Quick Links:**
📦 [npm Package](https://www.npmjs.com/package/@qiyuey/time-service) •
🐙 [GitHub](https://github.com/qiyuey/time-service) •
📝 [Changelog](https://github.com/qiyuey/time-service/releases) •
📖 [MCP Docs](https://modelcontextprotocol.io)

---

## ✨ Why Time Service?

### 🎯 Complete Solution
While other time MCP servers offer only 2 basic tools, **Time Service provides 8 comprehensive tools** covering every time-handling scenario:
- ✅ **Time queries** - Current time, timestamps, multiple timezones
- ✅ **Time calculations** - Add/subtract time, calculate differences
- ✅ **Timezone operations** - Convert between any timezones
- ✅ **Business scenarios** - Calculate business days, find next occurrences

### 🚀 Killer Features

**🔄 Batch Operations**
Query multiple timezones in one call - reduce API requests and get instant global time overview:
```
One call → All timezones with UTC offsets
```

**📅 Business Day Intelligence**
Automatically skip weekends when calculating deadlines - perfect for project management:
```
"Add 5 business days to today" → Automatically excludes weekends
```

**⏰ Smart Scheduling**
Find next occurrence with flexible conditions:
```
"Next Monday at 2pm" ✓
"Next 15th of the month" ✓
"Next Friday at 14:00" ✓
```

**🎨 Flexible Formatting**
4 built-in formats plus custom configurations:
- ISO 8601: `2024-01-15T10:30:00Z`
- Unix timestamp: `1705315800`
- Human-readable: `Monday, January 15, 2024 at 10:30:00 AM`
- Custom: Any format you need

### 💪 Production Ready

- ✅ **100% Test Coverage** - 115 comprehensive test cases
- ✅ **Fully Typed** - Complete TypeScript type system
- ✅ **Well Documented** - Clear examples and guides
- ✅ **Zero Installation** - Use directly with npx/bunx

---

## 🛠️ Available Tools

| Tool | What It Does | Use Case |
|------|-------------|----------|
| **get_current_time** | Get current time in any format/timezone | Check time across timezones |
| **get_timestamp** | Get Unix timestamp (seconds/milliseconds) | Generate timestamps for APIs |
| **add_time** | Add/subtract time periods | "What's the time 3 days from now?" |
| **time_diff** | Calculate time difference | "How many hours until deadline?" |
| **convert_timezone** | Convert time between timezones | "NYC 9am is what time in Tokyo?" |
| **get_multiple_timezones** | Get time in multiple zones at once | Display world clock |
| **get_business_days** | Calculate business days (skip weekends) | Project deadline calculations |
| **next_occurrence** | Find next specific day/date/time | "When's next Monday?", "Next 15th?" |

---

## 📦 Installation

### Quick Start (No Installation Required)

Add to your MCP client configuration:

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

### Alternative: Global Installation

```bash
npm install -g @qiyuey/time-service
```

Then configure:

```json
{
  "mcpServers": {
    "time-service": {
      "command": "time-service"
    }
  }
}
```

**Supported runtimes:** npm (Node.js), bun

---

## 🎯 Usage Examples

### Real-World Scenarios

**Scenario 1: Global Team Coordination**
```
User: "What time is it in our offices in New York, London, and Tokyo?"

Time Service: Uses get_multiple_timezones
→ Returns all three times with UTC offsets in one response
```

**Scenario 2: Project Deadline Calculation**
```
User: "If we start today, what's the date 10 business days from now?"

Time Service: Uses get_business_days
→ Automatically skips weekends, returns exact date
```

**Scenario 3: Meeting Scheduling**
```
User: "Convert 2pm EST to Tokyo time"

Time Service: Uses convert_timezone
→ Handles daylight saving automatically
```

**Scenario 4: Recurring Event Planning**
```
User: "When's the next Monday at 9am?"

Time Service: Uses next_occurrence
→ Finds exact date and time
```

### API Examples

**Get time in multiple timezones:**
```json
{
  "name": "get_multiple_timezones",
  "arguments": {
    "timezones": ["America/New_York", "Europe/London", "Asia/Tokyo"],
    "format": "readable"
  }
}
```

**Calculate business days:**
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

**Find next occurrence:**
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

## 🗺️ Roadmap

### P0 - Core Improvements ✅

- ✅ **Code Optimization** (v0.3.1) - Extracted shared utilities, achieved 100% function coverage
- ✅ **Comprehensive Testing** - 115 test cases covering all scenarios

### P1 - High Priority (Coming Soon)

- 📚 **Enhanced Documentation** - Detailed guides and tutorials
- 🐳 **Docker Support** - Container deployment ready
- 🔌 **Platform Integration Guides** - Claude Desktop, Zed, VS Code
- ⚡ **Performance Boost** - Caching and optimization

### P2 - Medium Priority (Future)

- 🌍 **Internationalization** - Multi-language support
- 📊 **Advanced Calculations** - Holiday support, working hours
- 📈 **Analytics** - Usage statistics and monitoring
- 🐍 **Python Version** - Expand to Python ecosystem

### P3 - Long-term Vision

- 🔄 **Auto-updating Timezone Database** - Always current
- 🌐 **Web API Service** - HTTP API version
- 🎨 **Custom Holiday Calendars** - Region-specific holidays
- 🔗 **Third-party Integrations** - Calendar systems, project management tools

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

**Priority Areas:**
- 🐳 Docker deployment configurations
- 📖 Documentation and integration guides  
- ✨ New time calculation features
- 🚀 Performance optimizations

**How to Contribute:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📚 Resources

- 📦 [npm Package](https://www.npmjs.com/package/@qiyuey/time-service)
- 🐙 [GitHub Repository](https://github.com/qiyuey/time-service)
- 📝 [Release Notes](https://github.com/qiyuey/time-service/releases)
- 🐛 [Issue Tracker](https://github.com/qiyuey/time-service/issues)
- 📖 [MCP Protocol](https://modelcontextprotocol.io)
- 🤖 [Claude AI](https://claude.ai)

---

## 🙋 FAQ

**Q: How is this different from the official @modelcontextprotocol/time?**  
A: We provide **8 comprehensive tools** vs 2 basic ones, including business day calculations, batch timezone queries, smart occurrence finding, and flexible formatting options.

**Q: Do I need to install anything?**  
A: No! Use `npx -y @qiyuey/time-service` directly in your MCP configuration.

**Q: What timezones are supported?**  
A: All IANA timezone names (e.g., `America/New_York`, `Asia/Tokyo`, `Europe/London`).

**Q: Can I use custom date formats?**  
A: Yes! Supports ISO, Unix, human-readable, and custom Intl.DateTimeFormat configurations.

**Q: Is it production-ready?**  
A: Absolutely! 100% function coverage, 115 test cases, fully typed, and actively maintained.

---

## 📄 License

MIT © [qiyuey](https://github.com/qiyuey)

---

<div align="center">

**Made with ❤️ for the MCP ecosystem**

[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-black?logo=bun)](https://bun.sh)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green)](https://modelcontextprotocol.io)

⭐ **If you find this useful, please star it on GitHub!** ⭐

</div>
