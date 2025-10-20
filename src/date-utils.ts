/**
 * 日期格式化工具函数 - 共享工具
 */

import { TIME_FORMATS, DEFAULTS, READABLE_DATE_OPTIONS } from "./config";

/**
 * 单位到毫秒的转换映射（用于性能优化）
 */
const UNIT_TO_MS_MAP = new Map<string, number>([
  ["milliseconds", 1],
  ["seconds", 1000],
  ["minutes", 60 * 1000],
  ["hours", 60 * 60 * 1000],
  ["days", 24 * 60 * 60 * 1000],
  ["weeks", 7 * 24 * 60 * 60 * 1000],
]);

/**
 * 时间单位转换为毫秒（优化版本）
 */
export function unitToMilliseconds(amount: number, unit: string): number {
  const unitLower = unit.toLowerCase();
  const multiplier = UNIT_TO_MS_MAP.get(unitLower);

  if (multiplier === undefined) {
    throw new Error(`Unknown unit: ${unit}`);
  }

  return amount * multiplier;
}

/**
 * 毫秒转换为指定单位（优化版本）
 */
export function millisecondsToUnit(milliseconds: number, unit: string): number {
  const unitLower = unit.toLowerCase();
  const multiplier = UNIT_TO_MS_MAP.get(unitLower);

  if (multiplier === undefined) {
    throw new Error(`Unknown unit: ${unit}`);
  }

  return milliseconds / multiplier;
}

/**
 * 格式化日期为指定格式（统一实现）
 */
export function formatDate(
  date: Date,
  format: string,
  timezone?: string,
): string {
  const formatLower = format.toLowerCase();

  if (formatLower === TIME_FORMATS.ISO) {
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
  } else if (formatLower === TIME_FORMATS.UNIX) {
    return Math.floor(date.getTime() / 1000).toString();
  } else if (formatLower === TIME_FORMATS.READABLE) {
    const options = { ...READABLE_DATE_OPTIONS };
    if (timezone) {
      options.timeZone = timezone;
    }
    return date.toLocaleString(DEFAULTS.LOCALE, options);
  }

  return date.toISOString();
}
