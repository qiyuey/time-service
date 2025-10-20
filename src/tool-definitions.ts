/**
 * MCP 工具定义
 */

import {
  TOOL_NAMES,
  TIME_FORMATS,
  TIMESTAMP_UNITS,
  TIME_DIFF_UNITS,
} from "./config";

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
 * add_time 工具定义
 */
export const addTimeToolDefinition = {
  name: TOOL_NAMES.ADD_TIME,
  description:
    "Add or subtract time from a base time (current time or specified time)",
  inputSchema: {
    type: "object",
    properties: {
      amount: {
        type: "number",
        description:
          "Amount of time to add (positive) or subtract (negative). Example: 3, -2, 24",
      },
      unit: {
        type: "string",
        description: "Unit of time for the amount",
        enum: Object.values(TIME_DIFF_UNITS),
      },
      baseTime: {
        type: "string",
        description:
          "Base time to calculate from (ISO 8601 format). Defaults to current time if not provided.",
      },
      format: {
        type: "string",
        description: "Format for the result time",
        enum: Object.values(TIME_FORMATS),
        default: TIME_FORMATS.ISO,
      },
      timezone: {
        type: "string",
        description:
          "Timezone for the result (e.g., 'America/New_York', 'Asia/Shanghai')",
      },
    },
    required: ["amount", "unit"],
  },
} as const;

/**
 * time_diff 工具定义
 */
export const timeDiffToolDefinition = {
  name: TOOL_NAMES.TIME_DIFF,
  description: "Calculate the difference between two times",
  inputSchema: {
    type: "object",
    properties: {
      startTime: {
        type: "string",
        description: "Start time (ISO 8601 format or parseable date string)",
      },
      endTime: {
        type: "string",
        description: "End time (ISO 8601 format or parseable date string)",
      },
      unit: {
        type: "string",
        description: "Unit to express the difference in",
        enum: Object.values(TIME_DIFF_UNITS),
        default: TIME_DIFF_UNITS.MILLISECONDS,
      },
    },
    required: ["startTime", "endTime"],
  },
} as const;

/**
 * convert_timezone 工具定义
 */
export const convertTimezoneToolDefinition = {
  name: TOOL_NAMES.CONVERT_TIMEZONE,
  description: "Convert a time from one timezone to another",
  inputSchema: {
    type: "object",
    properties: {
      time: {
        type: "string",
        description:
          "Time to convert (ISO 8601 format or parseable date string)",
      },
      fromTimezone: {
        type: "string",
        description:
          "Source timezone (e.g., 'America/New_York'). Defaults to UTC if not provided.",
      },
      toTimezone: {
        type: "string",
        description: "Target timezone (e.g., 'Asia/Shanghai'). Required.",
      },
      format: {
        type: "string",
        description: "Format for the result time",
        enum: Object.values(TIME_FORMATS),
        default: TIME_FORMATS.ISO,
      },
    },
    required: ["time", "toTimezone"],
  },
} as const;

/**
 * get_multiple_timezones 工具定义
 */
export const getMultipleTimezonesToolDefinition = {
  name: TOOL_NAMES.GET_MULTIPLE_TIMEZONES,
  description:
    "Get the current time in multiple timezones at once (batch operation)",
  inputSchema: {
    type: "object",
    properties: {
      timezones: {
        type: "array",
        description:
          "Array of timezone names (e.g., ['America/New_York', 'Asia/Tokyo', 'Europe/London'])",
        items: {
          type: "string",
        },
      },
      time: {
        type: "string",
        description:
          "Optional specific time to convert (ISO 8601 format). Defaults to current time.",
      },
      format: {
        type: "string",
        description: "Format for the result times",
        enum: Object.values(TIME_FORMATS),
        default: TIME_FORMATS.ISO,
      },
    },
    required: ["timezones"],
  },
} as const;

/**
 * get_business_days 工具定义
 */
export const getBusinessDaysToolDefinition = {
  name: TOOL_NAMES.GET_BUSINESS_DAYS,
  description:
    "Calculate a future or past date by adding/subtracting business days (working days, excluding weekends). Use this tool when users ask about business days, working days, weekdays, or questions like 'X business days from now/today', 'X working days after/before [date]', or 'what date is X business days from now'.",
  inputSchema: {
    type: "object",
    properties: {
      startDate: {
        type: "string",
        description: "Starting date (ISO 8601 format)",
      },
      days: {
        type: "number",
        description:
          "Number of business days to add (positive) or subtract (negative)",
      },
      excludeWeekends: {
        type: "boolean",
        description: "Whether to exclude weekends (default: true)",
        default: true,
      },
    },
    required: ["startDate", "days"],
  },
} as const;

/**
 * next_occurrence 工具定义
 */
export const nextOccurrenceToolDefinition = {
  name: TOOL_NAMES.NEXT_OCCURRENCE,
  description:
    "Find the next occurrence of a specific day of week, day of month, or time. Use this tool when users ask questions like 'when is the next Monday', 'next Friday at 2pm', 'when is the next 15th', 'next occurrence of Tuesday', or any question about finding the next specific day or time.",
  inputSchema: {
    type: "object",
    properties: {
      dayOfWeek: {
        type: "number",
        description:
          "Day of week (0=Sunday, 1=Monday, ..., 6=Saturday). Optional.",
      },
      dayOfMonth: {
        type: "number",
        description: "Day of month (1-31). Optional.",
      },
      time: {
        type: "string",
        description: 'Specific time in HH:mm format (e.g., "14:30"). Optional.',
      },
      baseTime: {
        type: "string",
        description:
          "Base time to calculate from (ISO 8601 format). Defaults to current time.",
      },
      timezone: {
        type: "string",
        description: "Timezone for the calculation (e.g., 'America/New_York')",
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
  addTimeToolDefinition,
  timeDiffToolDefinition,
  convertTimezoneToolDefinition,
  getMultipleTimezonesToolDefinition,
  getBusinessDaysToolDefinition,
  nextOccurrenceToolDefinition,
] as const;
