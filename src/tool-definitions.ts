/**
 * MCP 工具定义
 */

import { TOOL_NAMES, TIME_FORMATS, TIMESTAMP_UNITS } from "./config";

/**
 * get_current_time 工具定义
 */
export const getCurrentTimeToolDefinition = {
  name: TOOL_NAMES.GET_CURRENT_TIME,
  description: "Get the current date and time in various formats",
  inputSchema: {
    type: "object",
    properties: {
      format: {
        type: "string",
        description: `The format to return the time in: '${TIME_FORMATS.ISO}' (ISO 8601), '${TIME_FORMATS.UNIX}' (Unix timestamp), '${TIME_FORMATS.READABLE}' (human-readable), or '${TIME_FORMATS.CUSTOM}' (with custom format string)`,
        enum: Object.values(TIME_FORMATS),
        default: TIME_FORMATS.ISO,
      },
      timezone: {
        type: "string",
        description:
          "Timezone for the time (e.g., 'America/New_York', 'Asia/Shanghai'). Defaults to local timezone.",
      },
      customFormat: {
        type: "string",
        description:
          "Custom format string when format is 'custom'. Uses Intl.DateTimeFormat options as JSON string.",
      },
    },
  },
} as const;

/**
 * get_timestamp 工具定义
 */
export const getTimestampToolDefinition = {
  name: TOOL_NAMES.GET_TIMESTAMP,
  description: "Get the current Unix timestamp in seconds or milliseconds",
  inputSchema: {
    type: "object",
    properties: {
      unit: {
        type: "string",
        description: `Unit for timestamp: '${TIMESTAMP_UNITS.SECONDS}' or '${TIMESTAMP_UNITS.MILLISECONDS}'`,
        enum: Object.values(TIMESTAMP_UNITS),
        default: TIMESTAMP_UNITS.MILLISECONDS,
      },
    },
  },
} as const;

/**
 * 所有工具定义
 */
export const toolDefinitions = [
  getCurrentTimeToolDefinition,
  getTimestampToolDefinition,
] as const;
