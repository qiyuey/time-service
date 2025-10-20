# Time Service

[![npm version](https://img.shields.io/npm/v/@qiyuey/time-service.svg)](https://www.npmjs.com/package/@qiyuey/time-service)
[![npm downloads](https://img.shields.io/npm/dm/@qiyuey/time-service.svg)](https://www.npmjs.com/package/@qiyuey/time-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/qiyuey/time-service?style=social)](https://github.com/qiyuey/time-service)
[![GitHub Issues](https://img.shields.io/github/issues/qiyuey/time-service)](https://github.com/qiyuey/time-service/issues)
[![CI Status](https://github.com/qiyuey/time-service/actions/workflows/publish.yml/badge.svg)](https://github.com/qiyuey/time-service/actions)

A Model Context Protocol (MCP) server that provides time-related tools.

**Links:**
📦 [npm Package](https://www.npmjs.com/package/@qiyuey/time-service) •
🐙 [GitHub Repository](https://github.com/qiyuey/time-service) •
📝 [Changelog](https://github.com/qiyuey/time-service/releases) •
🐛 [Report Issues](https://github.com/qiyuey/time-service/issues) •
📖 [MCP Documentation](https://modelcontextprotocol.io)

## Features

This MCP server provides comprehensive time manipulation tools:

### Core Time Tools

1. **get_current_time** - Get the current date and time in various formats
   - Formats: ISO 8601, Unix timestamp, human-readable, or custom
   - Supports timezone specification
   - Custom format options

2. **get_timestamp** - Get the current Unix timestamp
   - Returns timestamp in seconds or milliseconds

### Time Calculation Tools

1. **add_time** - Add or subtract time from a base time
   - Supports: milliseconds, seconds, minutes, hours, days, weeks
   - Works with current time or specified base time
   - Configurable output format and timezone

2. **time_diff** - Calculate the difference between two times
   - Returns difference in any time unit
   - Provides both signed and absolute difference
   - Supports any parseable date format

3. **convert_timezone** - Convert time between timezones
   - Convert from any timezone to another
   - Supports all IANA timezone names
   - Flexible output formatting

### Batch and Business Tools

1. **get_multiple_timezones** - Get time in multiple timezones at once
   - Batch operation to reduce API calls
   - Returns time with UTC offset for each timezone
   - Supports all output formats

2. **get_business_days** - Calculate business days
   - Add/subtract business days excluding weekends
   - Useful for deadline calculations
   - Returns total calendar days spanned

3. **next_occurrence** - Find next occurrence of specific day/time
   - Find next Monday, Friday, etc.
   - Find next 15th, 1st, etc. of the month
   - Combine conditions (e.g., "next Monday at 2pm")
   - Great for scheduling and reminders

## Installation

### Using npx (Recommended)

No installation required! Configure your MCP client:

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

### Using bunx

```json
{
  "mcpServers": {
    "time-service": {
      "command": "bunx",
      "args": ["@qiyuey/time-service"]
    }
  }
}
```

### Using global installation

```bash
npm install -g @qiyuey/time-service
# or
bun install -g @qiyuey/time-service
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

### From source

```bash
git clone https://github.com/qiyuey/time-service.git
cd time-service
bun install
```

Configure with absolute path:

```json
{
  "mcpServers": {
    "time-service": {
      "command": "bun",
      "args": ["/absolute/path/to/time-service/time-server.ts"]
    }
  }
}
```

## Example Tool Calls

### Basic Time Tools

**Get current time in ISO format:**

```json
{
  "name": "get_current_time",
  "arguments": {
    "format": "iso"
  }
}
```

**Get current time in readable format with timezone:**

```json
{
  "name": "get_current_time",
  "arguments": {
    "format": "readable",
    "timezone": "Asia/Shanghai"
  }
}
```

**Get Unix timestamp in seconds:**

```json
{
  "name": "get_timestamp",
  "arguments": {
    "unit": "seconds"
  }
}
```

### Time Calculation Examples

**Add 3 days to current time:**

```json
{
  "name": "add_time",
  "arguments": {
    "amount": 3,
    "unit": "days",
    "format": "iso"
  }
}
```

**Subtract 2 hours from a specific time:**

```json
{
  "name": "add_time",
  "arguments": {
    "amount": -2,
    "unit": "hours",
    "baseTime": "2024-01-15T12:00:00Z"
  }
}
```

**Calculate difference between two times:**

```json
{
  "name": "time_diff",
  "arguments": {
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-01-15T00:00:00Z",
    "unit": "days"
  }
}
```

**Convert time between timezones:**

```json
{
  "name": "convert_timezone",
  "arguments": {
    "time": "2024-01-01T12:00:00Z",
    "fromTimezone": "America/New_York",
    "toTimezone": "Asia/Tokyo",
    "format": "readable"
  }
}
```

### Business Operations Examples

**Get time in multiple timezones at once:**

```json
{
  "name": "get_multiple_timezones",
  "arguments": {
    "timezones": ["America/New_York", "Europe/London", "Asia/Tokyo"]
  }
}
```

**Calculate 5 business days from a date:**

```json
{
  "name": "get_business_days",
  "arguments": {
    "startDate": "2024-01-15T00:00:00Z",
    "days": 5
  }
}
```

**Find next Monday:**

```json
{
  "name": "next_occurrence",
  "arguments": {
    "dayOfWeek": 1
  }
}
```

**Find next 15th of the month at 2pm:**

```json
{
  "name": "next_occurrence",
  "arguments": {
    "dayOfMonth": 15,
    "time": "14:00"
  }
}
```

## Project Structure

```text
time-service/
├── time-server.ts              # Main MCP server entry point
├── src/
│   ├── config.ts               # Configuration and constants
│   ├── types.ts                # TypeScript type definitions
│   ├── validation.ts           # Input validation utilities
│   ├── time-formatter.ts       # Time formatting utilities
│   ├── time-calculator.ts      # Time calculation utilities
│   ├── time-business.ts        # Business time functions
│   ├── resources.ts            # MCP Resources definitions
│   ├── tool-definitions.ts     # MCP tool schemas
│   ├── tool-handlers.ts        # Tool execution logic
│   ├── *.test.ts               # Comprehensive test suite
├── package.json
└── README.md
```

## MCP Resources

This server provides discoverable resources for better user experience:

- **time://timezones/common** - List of commonly used timezone names
- **time://timezones/by-region** - Timezones grouped by geographic region
- **time://formats** - Available time formats with examples
- **time://tools/examples** - Example use cases for each tool

## Development

The server is built using:

- **Bun runtime** - Fast JavaScript runtime
- **@modelcontextprotocol/sdk** - Official MCP SDK
- **TypeScript** - Type-safe development

### Running Tests

```bash
bun test
```

The project includes comprehensive test coverage:

- 83+ tests covering all functionality
- Unit tests for time formatting and calculations
- Unit tests for business time functions
- Validation tests for input parameters
- Integration tests for tool handlers

### Architecture

The codebase follows a modular architecture:

- **Separation of concerns**: Configuration, types, validation, business
  logic, and MCP integration are separated
- **Robust validation**: All inputs are validated with clear error messages
- **Reusable utilities**: Time functions can be easily tested and reused
- **Type safety**: Full TypeScript support with shared type definitions
- **Extensible**: Easy to add new tools by extending the tool definitions
  and handlers
- **Well-tested**: Comprehensive test suite ensures reliability

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Links & Resources

- 📦 **npm Package**: [https://www.npmjs.com/package/@qiyuey/time-service](https://www.npmjs.com/package/@qiyuey/time-service)
- 🐙 **GitHub**: [https://github.com/qiyuey/time-service](https://github.com/qiyuey/time-service)
- 📖 **MCP Protocol**: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
- 🤖 **Claude AI**: [https://claude.ai](https://claude.ai)
- 💬 **Issues & Support**: [GitHub Issues](https://github.com/qiyuey/time-service/issues)

## License

MIT © [qiyuey](https://github.com/qiyuey)

---

Made with ❤️ for the MCP ecosystem

[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-black?logo=bun)](https://bun.sh)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green)](https://modelcontextprotocol.io)
