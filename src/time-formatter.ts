/**
 * 时间格式化工具函数
 */

import {
  TIME_FORMATS,
  TIMESTAMP_UNITS,
  DEFAULTS,
  READABLE_DATE_OPTIONS,
} from "./config";
import type {
  TimeFormatOptions,
  TimestampOptions,
  FormattedTime,
  TimestampResult,
} from "./types";
import {
  isValidTimezone,
  validateCustomFormat,
  isValidTimeFormat,
  isValidTimestampUnit,
} from "./validation";

/**
 * 格式化为 Unix 时间戳（秒）
 */
function formatUnixTimestamp(date: Date): string {
  return Math.floor(date.getTime() / 1000).toString();
}

/**
 * 格式化为可读格式
 */
function formatReadable(date: Date, timezone?: string): string {
  const options = { ...READABLE_DATE_OPTIONS };
  if (timezone) {
    options.timeZone = timezone;
  }
  return date.toLocaleString(DEFAULTS.LOCALE, options);
}

/**
 * 格式化为自定义格式
 */
function formatCustom(
  date: Date,
  customFormat?: string,
  timezone?: string,
): string {
  if (!customFormat) {
    throw new Error("Custom format string is required when format is 'custom'");
  }

  const validation = validateCustomFormat(customFormat);
  if (!validation.valid) {
    throw new Error(`Invalid custom format: ${validation.error}`);
  }

  const customOptions = validation.options!;
  if (timezone) {
    customOptions.timeZone = timezone;
  }
  return date.toLocaleString(DEFAULTS.LOCALE, customOptions);
}

/**
 * 格式化为 ISO 格式
 */
function formatISO(date: Date, timezone?: string): string {
  if (timezone) {
    return date.toLocaleString(DEFAULTS.LOCALE, {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  return date.toISOString();
}

/**
 * 根据格式类型格式化时间
 */
export function formatTime(options: TimeFormatOptions = {}): FormattedTime {
  const format = options.format || DEFAULTS.TIME_FORMAT;
  const timezone = options.timezone;

  // 验证格式类型
  if (format && !isValidTimeFormat(format)) {
    throw new Error(
      `Invalid format: ${format}. Must be one of: iso, unix, readable, custom`,
    );
  }

  // 验证时区
  if (timezone && !isValidTimezone(timezone)) {
    throw new Error(`Invalid timezone: ${timezone}`);
  }

  const now = new Date();
  let timeString: string;

  switch (format) {
    case TIME_FORMATS.UNIX:
      timeString = formatUnixTimestamp(now);
      break;
    case TIME_FORMATS.READABLE:
      timeString = formatReadable(now, timezone);
      break;
    case TIME_FORMATS.CUSTOM:
      timeString = formatCustom(now, options.customFormat, timezone);
      break;
    case TIME_FORMATS.ISO:
    default:
      timeString = formatISO(now, timezone);
      break;
  }

  return {
    time: timeString,
    format: format,
    timezone: timezone || DEFAULTS.TIMEZONE,
  };
}

/**
 * 获取时间戳
 */
export function getTimestamp(options: TimestampOptions = {}): TimestampResult {
  const unit = options.unit || DEFAULTS.TIMESTAMP_UNIT;

  // 验证单位
  if (unit && !isValidTimestampUnit(unit)) {
    throw new Error(
      `Invalid unit: ${unit}. Must be one of: seconds, milliseconds`,
    );
  }

  const now = Date.now();

  const timestamp =
    unit === TIMESTAMP_UNITS.SECONDS ? Math.floor(now / 1000) : now;

  return {
    timestamp,
    unit,
  };
}
