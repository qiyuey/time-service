# Time Service

A Model Context Protocol (MCP) server that provides time-related tools.

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

3. **add_time** - Add or subtract time from a base time
   - Supports: milliseconds, seconds, minutes, hours, days, weeks
   - Works with current time or specified base time
   - Configurable output format and timezone

4. **time_diff** - Calculate the difference between two times
   - Returns difference in any time unit
   - Provides both signed and absolute difference
   - Supports any parseable date format

5. **convert_timezone** - Convert time between timezones
   - Convert from any timezone to another
   - Supports all IANA timezone names
   - Flexible output formatting

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

### Core Time Tools

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

### Time Calculation Tools

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
│   ├── tool-definitions.ts     # MCP tool schemas
│   ├── tool-handlers.ts        # Tool execution logic
│   ├── *.test.ts               # Comprehensive test suite
├── package.json
└── README.md
```

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

- 60+ tests covering all functionality
- Unit tests for time formatting and calculations
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

## License

MIT
