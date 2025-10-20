# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository.

## Project Overview

This is a **Model Context Protocol (MCP) server** that provides comprehensive
time manipulation tools to Claude and other MCP clients. It's a TypeScript
project running on Bun runtime.

**Available Tools:**

Core Time:

- `get_current_time`: Get current date/time in various formats
- `get_timestamp`: Get Unix timestamp

Time Calculations:

- `add_time`: Add/subtract time from a base time
- `time_diff`: Calculate difference between two times
- `convert_timezone`: Convert time between timezones

Batch & Business:

- `get_multiple_timezones`: Get time in multiple timezones at once
- `get_business_days`: Calculate business days (excluding weekends)
- `next_occurrence`: Find next occurrence of specific day/time

## Common Commands

### Development

```bash
# Start the MCP server (usually called by MCP client, not directly)
bun start

# Run tests
bun test

# Install dependencies
bun install
```

### Release Management

```bash
# Patch release (0.1.0 -> 0.1.1)
bun run release:patch

# Minor release (0.1.0 -> 0.2.0)
bun run release:minor

# Major release (0.1.0 -> 1.0.0)
bun run release:major
```

## Architecture

### MCP Server Pattern

This codebase follows the standard MCP server architecture:

1. **Server Setup** (`time-server.ts`): Entry point that creates an MCP
   server instance using `@modelcontextprotocol/sdk`
2. **Tool Definitions** (`src/tool-definitions.ts`): JSON schemas describing
   available tools and their parameters
3. **Tool Handlers** (`src/tool-handlers.ts`): Business logic that executes
   when tools are called
4. **Core Logic**:
   - `src/time-formatter.ts`: Time formatting utilities
   - `src/time-calculator.ts`: Time calculation utilities
   - `src/time-business.ts`: Business time functions
5. **Validation** (`src/validation.ts`): Input validation functions
6. **Resources** (`src/resources.ts`): MCP Resources definitions
7. **Configuration** (`src/config.ts`): Constants and server configuration
8. **Types** (`src/types.ts`): TypeScript type definitions

### Communication Flow

```text
MCP Client (Claude)
  → ListToolsRequest → Returns tool definitions
  → CallToolRequest → Routes to appropriate handler → Returns result
```

### Module Structure

- **Separation of concerns**: Tool schemas are separate from execution logic
- **Type safety**: All functions use TypeScript interfaces from `types.ts`
- **Input validation**: All user inputs are validated before processing
- **Extensibility**: Add new tools by:
  1. Adding types to `types.ts`
  2. Adding validation to `validation.ts` (if needed)
  3. Adding core logic to `time-formatter.ts` or `time-calculator.ts`
  4. Adding a tool definition to `tool-definitions.ts`
  5. Adding a handler function to `tool-handlers.ts`
  6. Adding the handler to the `toolHandlers` map
  7. Writing tests in `*.test.ts` files

## Key Implementation Details

### Tool Response Format

All tool handlers must return a `ToolResult` object:

```typescript
{
  content: [{ type: "text", text: "..." }],
  isError?: boolean
}
```

### Error Handling

- All inputs are validated before processing
- Invalid inputs throw descriptive errors
- Tool handlers use try-catch to capture errors
- `createErrorResponse()` standardizes error formatting
- Errors are returned as tool results, not thrown

### Stdio Communication

- Server uses `StdioServerTransport` for communication
- `console.error()` is safe for logging (doesn't interfere with stdio)
- All MCP communication happens through stdin/stdout

## Testing Notes

This project has comprehensive test coverage (83+ tests):

- **Test Framework**: `bun test`
- **Test Files**: `src/*.test.ts`
- **Coverage Includes**:
  - Unit tests for `time-formatter.ts` utilities
  - Unit tests for `time-calculator.ts` functions
  - Unit tests for `time-business.ts` functions
  - Validation tests for `validation.ts`
  - Integration tests for `tool-handlers.ts`
  - Error handling and edge cases

**Run tests**: `bun test`

When adding new features:

1. Write tests before implementing (TDD recommended)
2. Test happy paths and error cases
3. Validate edge cases (invalid inputs, boundary conditions)
4. Ensure 100% coverage of new code

## Bun-Specific Notes

- This project uses **Bun runtime** (not Node.js)
- Shebang in `time-server.ts`: `#!/usr/bin/env bun`
- Bun natively supports TypeScript (no build step needed)
- Use `bun` commands instead of `npm`/`node`/`ts-node`
