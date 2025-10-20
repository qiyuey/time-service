/**
 * MCP 服务器配置
 */

/**
 * 服务器基本信息
 */
export const SERVER_CONFIG = {
  name: "time-server",
  version: "1.0.0",
} as const;

/**
 * 工具名称常量
 */
export const TOOL_NAMES = {
  GET_CURRENT_TIME: "get_current_time",
  GET_TIMESTAMP: "get_timestamp",
  ADD_TIME: "add_time",
  TIME_DIFF: "time_diff",
  CONVERT_TIMEZONE: "convert_timezone",
  GET_MULTIPLE_TIMEZONES: "get_multiple_timezones",
  GET_BUSINESS_DAYS: "get_business_days",
  NEXT_OCCURRENCE: "next_occurrence",
} as const;

/**
 * 时间格式类型
 */
export const TIME_FORMATS = {
  ISO: "iso",
  UNIX: "unix",
  READABLE: "readable",
  CUSTOM: "custom",
} as const;

/**
 * 时间戳单位
 */
export const TIMESTAMP_UNITS = {
  SECONDS: "seconds",
  MILLISECONDS: "milliseconds",
} as const;

/**
 * 时间差单位
 */
export const TIME_DIFF_UNITS = {
  MILLISECONDS: "milliseconds",
  SECONDS: "seconds",
  MINUTES: "minutes",
  HOURS: "hours",
  DAYS: "days",
  WEEKS: "weeks",
} as const;

/**
 * 默认值配置
 */
export const DEFAULTS = {
  TIME_FORMAT: TIME_FORMATS.ISO,
  TIMESTAMP_UNIT: TIMESTAMP_UNITS.MILLISECONDS,
  TIMEZONE: "local",
  LOCALE: "en-US",
} as const;

/**
 * 可读格式的日期时间选项
 */
export const READABLE_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
} as const;
