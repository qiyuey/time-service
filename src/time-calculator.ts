/**
 * 时间计算工具函数
 */

import { TIME_FORMATS, TIME_DIFF_UNITS, DEFAULTS } from "./config";
import type {
  AddTimeOptions,
  AddTimeResult,
  TimeDiffOptions,
  TimeDiffResult,
  ConvertTimezoneOptions,
  ConvertTimezoneResult,
} from "./types";
import {
  isValidTimezone,
  isValidTimeString,
  isValidTimeDiffUnit,
  isValidTimeFormat,
} from "./validation";
import {
  unitToMilliseconds,
  millisecondsToUnit,
  formatDate,
} from "./date-utils";

/**
 * 时间加减运算
 */
export function addTime(options: AddTimeOptions): AddTimeResult {
  // 验证单位
  if (!isValidTimeDiffUnit(options.unit)) {
    throw new Error(
      `Invalid unit: ${options.unit}. Must be one of: milliseconds, seconds, minutes, hours, days, weeks`,
    );
  }

  // 验证时区
  if (options.timezone && !isValidTimezone(options.timezone)) {
    throw new Error(`Invalid timezone: ${options.timezone}`);
  }

  // 验证格式
  const format = options.format || TIME_FORMATS.ISO;
  if (!isValidTimeFormat(format)) {
    throw new Error(`Invalid format: ${format}`);
  }

  // 获取基准时间
  let baseDate: Date;
  let originalTimeString: string;

  if (options.baseTime) {
    if (!isValidTimeString(options.baseTime)) {
      throw new Error(`Invalid base time: ${options.baseTime}`);
    }
    baseDate = new Date(options.baseTime);
    originalTimeString = options.baseTime;
  } else {
    baseDate = new Date();
    originalTimeString = baseDate.toISOString();
  }

  // 计算新时间
  const millisToAdd = unitToMilliseconds(options.amount, options.unit);
  const resultDate = new Date(baseDate.getTime() + millisToAdd);

  // 格式化结果
  const resultTimeString = formatDate(resultDate, format, options.timezone);

  return {
    originalTime: originalTimeString,
    resultTime: resultTimeString,
    amount: options.amount,
    unit: options.unit,
    format: format,
    timezone: options.timezone || DEFAULTS.TIMEZONE,
  };
}

/**
 * 计算两个时间的差值
 */
export function timeDiff(options: TimeDiffOptions): TimeDiffResult {
  // 验证时间字符串
  if (!isValidTimeString(options.startTime)) {
    throw new Error(`Invalid start time: ${options.startTime}`);
  }
  if (!isValidTimeString(options.endTime)) {
    throw new Error(`Invalid end time: ${options.endTime}`);
  }

  // 验证单位
  const unit = options.unit || TIME_DIFF_UNITS.MILLISECONDS;
  if (!isValidTimeDiffUnit(unit)) {
    throw new Error(
      `Invalid unit: ${unit}. Must be one of: milliseconds, seconds, minutes, hours, days, weeks`,
    );
  }

  // 计算差值
  const startDate = new Date(options.startTime);
  const endDate = new Date(options.endTime);
  const diffMs = endDate.getTime() - startDate.getTime();

  // 转换为指定单位
  const difference = millisecondsToUnit(diffMs, unit);

  return {
    startTime: options.startTime,
    endTime: options.endTime,
    difference: difference,
    unit: unit,
    absoluteDifference: Math.abs(difference),
  };
}

/**
 * 时区转换
 */
export function convertTimezone(
  options: ConvertTimezoneOptions,
): ConvertTimezoneResult {
  // 验证时间字符串
  if (!isValidTimeString(options.time)) {
    throw new Error(`Invalid time: ${options.time}`);
  }

  // 验证目标时区
  if (!isValidTimezone(options.toTimezone)) {
    throw new Error(`Invalid target timezone: ${options.toTimezone}`);
  }

  // 验证源时区（如果提供）
  if (options.fromTimezone && !isValidTimezone(options.fromTimezone)) {
    throw new Error(`Invalid source timezone: ${options.fromTimezone}`);
  }

  // 验证格式
  const format = options.format || TIME_FORMATS.ISO;
  if (!isValidTimeFormat(format)) {
    throw new Error(`Invalid format: ${format}`);
  }

  // 解析时间
  const date = new Date(options.time);

  // 格式化为目标时区
  const convertedTime = formatDate(date, format, options.toTimezone);

  // 格式化原始时间
  const originalTime = options.fromTimezone
    ? formatDate(date, format, options.fromTimezone)
    : options.time;

  return {
    originalTime: originalTime,
    originalTimezone: options.fromTimezone || "UTC",
    convertedTime: convertedTime,
    convertedTimezone: options.toTimezone,
    format: format,
  };
}
