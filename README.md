# Time Service

A Model Context Protocol (MCP) server that provides time-related tools.

## Features

This MCP server provides two tools:

1. **get_current_time** - Get the current date and time in various formats
   - Formats: ISO 8601, Unix timestamp, human-readable, or custom
   - Supports timezone specification
   - Custom format options

2. **get_timestamp** - Get the current Unix timestamp
   - Returns timestamp in seconds or milliseconds

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

### Example Tool Calls

**Get current time in ISO format:**

```json
{
  "name": "get_current_time",
  "arguments": {
    "format": "iso"
  }
}
```

**Get current time in readable format:**

```json
{
  "name": "get_current_time",
  "arguments": {
    "format": "readable",
    "timezone": "Asia/Shanghai"
  }
}
```

**Get Unix timestamp:**

```json
{
  "name": "get_timestamp",
  "arguments": {
    "unit": "seconds"
  }
}
```

## Project Structure

```text
time-service/
├── time-server.ts           # Main MCP server entry point
├── src/
│   ├── config.ts            # Configuration and constants
│   ├── types.ts             # TypeScript type definitions
│   ├── time-formatter.ts    # Time formatting utilities
│   ├── tool-definitions.ts  # MCP tool schemas
│   └── tool-handlers.ts     # Tool execution logic
├── package.json
└── README.md
```

## Development

The server is built using:

- **Bun runtime** - Fast JavaScript runtime
- **@modelcontextprotocol/sdk** - Official MCP SDK
- **TypeScript** - Type-safe development

### Architecture

The codebase follows a modular architecture:

- **Separation of concerns**: Configuration, types, business logic, and
  MCP integration are separated
- **Reusable utilities**: Time formatting functions can be easily tested
  and reused
- **Type safety**: Full TypeScript support with shared type definitions
- **Extensible**: Easy to add new tools by extending the tool definitions
  and handlers

## License

MIT
