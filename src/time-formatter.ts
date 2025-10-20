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
    return date.toISOString();
  }

  try {
    const customOptions = JSON.parse(customFormat);
    if (timezone) {
      customOptions.timeZone = timezone;
    }
    return date.toLocaleString(DEFAULTS.LOCALE, customOptions);
  } catch {
    // 如果解析失败，回退到 ISO 格式
    return date.toISOString();
  }
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
  const now = Date.now();

  const timestamp =
    unit === TIMESTAMP_UNITS.SECONDS ? Math.floor(now / 1000) : now;

  return {
    timestamp,
    unit,
  };
}
