/**
 * MCP Resources 定义
 */

/**
 * 常用时区列表
 */
export const COMMON_TIMEZONES = [
  // 北美
  "America/New_York", // EST/EDT
  "America/Chicago", // CST/CDT
  "America/Denver", // MST/MDT
  "America/Los_Angeles", // PST/PDT
  "America/Toronto",
  "America/Vancouver",
  "America/Mexico_City",

  // 南美
  "America/Sao_Paulo",
  "America/Buenos_Aires",
  "America/Santiago",

  // 欧洲
  "Europe/London", // GMT/BST
  "Europe/Paris", // CET/CEST
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Madrid",
  "Europe/Amsterdam",
  "Europe/Brussels",
  "Europe/Vienna",
  "Europe/Stockholm",
  "Europe/Moscow",

  // 亚洲
  "Asia/Shanghai", // CST
  "Asia/Tokyo", // JST
  "Asia/Hong_Kong", // HKT
  "Asia/Seoul", // KST
  "Asia/Singapore", // SGT
  "Asia/Taipei",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Manila",
  "Asia/Kuala_Lumpur",
  "Asia/Dubai",
  "Asia/Kolkata", // IST
  "Asia/Karachi",

  // 大洋洲
  "Pacific/Auckland", // NZST/NZDT
  "Australia/Sydney", // AEST/AEDT
  "Australia/Melbourne",
  "Australia/Brisbane",
  "Australia/Perth",

  // 非洲
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "Africa/Nairobi",

  // 其他
  "UTC",
];

/**
 * 时区分组
 */
export const TIMEZONE_GROUPS = {
  "North America": [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Toronto",
    "America/Vancouver",
    "America/Mexico_City",
  ],
  "South America": [
    "America/Sao_Paulo",
    "America/Buenos_Aires",
    "America/Santiago",
  ],
  Europe: [
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Europe/Madrid",
    "Europe/Amsterdam",
    "Europe/Brussels",
    "Europe/Vienna",
    "Europe/Stockholm",
    "Europe/Moscow",
  ],
  Asia: [
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Asia/Hong_Kong",
    "Asia/Seoul",
    "Asia/Singapore",
    "Asia/Taipei",
    "Asia/Bangkok",
    "Asia/Jakarta",
    "Asia/Manila",
    "Asia/Kuala_Lumpur",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Karachi",
  ],
  Oceania: [
    "Pacific/Auckland",
    "Australia/Sydney",
    "Australia/Melbourne",
    "Australia/Brisbane",
    "Australia/Perth",
  ],
  Africa: [
    "Africa/Cairo",
    "Africa/Johannesburg",
    "Africa/Lagos",
    "Africa/Nairobi",
  ],
};

/**
 * 格式示例
 */
export const FORMAT_EXAMPLES = {
  iso: {
    description: "ISO 8601 format",
    example: "2024-01-15T14:30:00.000Z",
    use_case: "Standard format for APIs and data exchange",
  },
  unix: {
    description: "Unix timestamp in seconds",
    example: "1705329000",
    use_case: "Simple numeric format, good for calculations",
  },
  readable: {
    description: "Human-readable format",
    example: "Monday, January 15, 2024, 02:30:00 PM EST",
    use_case: "Display to users, includes day name and timezone",
  },
  custom: {
    description: "Custom format using Intl.DateTimeFormat options",
    example: '{"year": "numeric", "month": "2-digit", "day": "2-digit"}',
    use_case: "Flexible formatting with JSON configuration",
  },
};

/**
 * 可用的 MCP Resources
 */
export const resources = [
  {
    uri: "time://timezones/common",
    name: "Common Timezones",
    description: "List of commonly used timezone names",
    mimeType: "application/json",
  },
  {
    uri: "time://timezones/by-region",
    name: "Timezones by Region",
    description: "Timezones grouped by geographic region",
    mimeType: "application/json",
  },
  {
    uri: "time://formats",
    name: "Time Formats",
    description: "Available time formats with examples and use cases",
    mimeType: "application/json",
  },
  {
    uri: "time://tools/examples",
    name: "Tool Usage Examples",
    description: "Example use cases for each tool",
    mimeType: "application/json",
  },
];

/**
 * 工具使用示例
 */
export const TOOL_EXAMPLES = {
  get_current_time: {
    description: "Get current time in various formats",
    examples: [
      {
        use_case: "Get current time in ISO format",
        request: {
          format: "iso",
        },
      },
      {
        use_case: "Get current time in New York timezone",
        request: {
          format: "readable",
          timezone: "America/New_York",
        },
      },
    ],
  },
  add_time: {
    description: "Add or subtract time",
    examples: [
      {
        use_case: "Calculate 3 days from now",
        request: {
          amount: 3,
          unit: "days",
        },
      },
      {
        use_case: "Calculate 2 hours before a specific time",
        request: {
          amount: -2,
          unit: "hours",
          baseTime: "2024-01-15T12:00:00Z",
        },
      },
    ],
  },
  time_diff: {
    description: "Calculate difference between two times",
    examples: [
      {
        use_case: "Days between two dates",
        request: {
          startTime: "2024-01-01T00:00:00Z",
          endTime: "2024-01-15T00:00:00Z",
          unit: "days",
        },
      },
    ],
  },
  convert_timezone: {
    description: "Convert time between timezones",
    examples: [
      {
        use_case: "Convert from New York to Tokyo time",
        request: {
          time: "2024-01-15T12:00:00Z",
          fromTimezone: "America/New_York",
          toTimezone: "Asia/Tokyo",
        },
      },
    ],
  },
  get_multiple_timezones: {
    description: "Get time in multiple timezones at once",
    examples: [
      {
        use_case: "Current time in major financial centers",
        request: {
          timezones: [
            "America/New_York",
            "Europe/London",
            "Asia/Tokyo",
            "Asia/Hong_Kong",
          ],
        },
      },
    ],
  },
  get_business_days: {
    description: "Calculate business days (excluding weekends)",
    examples: [
      {
        use_case: "Add 5 business days to a date",
        request: {
          startDate: "2024-01-15T00:00:00Z",
          days: 5,
        },
      },
    ],
  },
  next_occurrence: {
    description: "Find next occurrence of specific day/time",
    examples: [
      {
        use_case: "Find next Monday",
        request: {
          dayOfWeek: 1,
        },
      },
      {
        use_case: "Find next 15th of the month",
        request: {
          dayOfMonth: 15,
        },
      },
    ],
  },
};

/**
 * 根据 URI 获取 Resource 内容
 */
export function getResourceContent(uri: string): string {
  switch (uri) {
    case "time://timezones/common":
      return JSON.stringify(COMMON_TIMEZONES, null, 2);
    case "time://timezones/by-region":
      return JSON.stringify(TIMEZONE_GROUPS, null, 2);
    case "time://formats":
      return JSON.stringify(FORMAT_EXAMPLES, null, 2);
    case "time://tools/examples":
      return JSON.stringify(TOOL_EXAMPLES, null, 2);
    default:
      throw new Error(`Unknown resource URI: ${uri}`);
  }
}
