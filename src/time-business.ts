/**
 * 业务时间计算工具函数
 */

import { TIME_FORMATS, DEFAULTS } from "./config";
import type {
  MultipleTimezonesOptions,
  MultipleTimezonesResult,
  TimezoneInfo,
  BusinessDaysOptions,
  BusinessDaysResult,
  NextOccurrenceOptions,
  NextOccurrenceResult,
} from "./types";
import {
  isValidTimezone,
  isValidTimeString,
  isValidTimeFormat,
} from "./validation";

/**
 * 获取 UTC 偏移量字符串
 */
function getUTCOffset(date: Date, timezone: string): string {
  const utcDate = new Date(
    date.toLocaleString("en-US", { timeZone: "UTC" }),
  );
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  const offsetMs = tzDate.getTime() - utcDate.getTime();
  const offsetHours = Math.floor(Math.abs(offsetMs) / (1000 * 60 * 60));
  const offsetMinutes = Math.floor(
    (Math.abs(offsetMs) % (1000 * 60 * 60)) / (1000 * 60),
  );
  const sign = offsetMs >= 0 ? "+" : "-";
  return `UTC${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
}

/**
 * 格式化日期为指定格式
 */
function formatDateForTimezone(
  date: Date,
  timezone: string,
  format: string,
): string {
  const formatLower = format.toLowerCase();

  if (formatLower === TIME_FORMATS.ISO) {
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
  } else if (formatLower === TIME_FORMATS.UNIX) {
    return Math.floor(date.getTime() / 1000).toString();
  } else if (formatLower === TIME_FORMATS.READABLE) {
    return date.toLocaleString(DEFAULTS.LOCALE, {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  }

  return date.toISOString();
}

/**
 * 获取多个时区的当前时间
 */
export function getMultipleTimezones(
  options: MultipleTimezonesOptions,
): MultipleTimezonesResult {
  // 验证时区
  for (const timezone of options.timezones) {
    if (!isValidTimezone(timezone)) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }
  }

  // 验证格式
  const format = options.format || TIME_FORMATS.ISO;
  if (!isValidTimeFormat(format)) {
    throw new Error(`Invalid format: ${format}`);
  }

  // 获取基准时间
  let baseDate: Date;
  let baseTimeString: string;

  if (options.time) {
    if (!isValidTimeString(options.time)) {
      throw new Error(`Invalid time: ${options.time}`);
    }
    baseDate = new Date(options.time);
    baseTimeString = options.time;
  } else {
    baseDate = new Date();
    baseTimeString = baseDate.toISOString();
  }

  // 获取每个时区的时间
  const timezones: TimezoneInfo[] = options.timezones.map((timezone) => {
    const time = formatDateForTimezone(baseDate, timezone, format);
    const utcOffset = getUTCOffset(baseDate, timezone);

    return {
      timezone,
      time,
      format,
      utcOffset,
    };
  });

  return {
    baseTime: baseTimeString,
    timezones,
  };
}

/**
 * 判断是否为周末
 */
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

/**
 * 计算工作日
 */
export function getBusinessDays(
  options: BusinessDaysOptions,
): BusinessDaysResult {
  // 验证起始日期
  if (!isValidTimeString(options.startDate)) {
    throw new Error(`Invalid start date: ${options.startDate}`);
  }

  const excludeWeekends = options.excludeWeekends !== false; // 默认排除周末
  const startDate = new Date(options.startDate);
  let currentDate = new Date(startDate);
  let daysAdded = 0;
  const direction = options.days >= 0 ? 1 : -1;
  const totalDays = Math.abs(options.days);

  while (daysAdded < totalDays) {
    currentDate.setDate(currentDate.getDate() + direction);

    // 如果排除周末且当前是周末，跳过
    if (excludeWeekends && isWeekend(currentDate)) {
      continue;
    }

    daysAdded++;
  }

  const totalDaysSpanned = Math.abs(
    Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );

  return {
    startDate: options.startDate,
    days: options.days,
    resultDate: currentDate.toISOString(),
    excludedWeekends: excludeWeekends,
    totalDaysSpanned,
  };
}

/**
 * 获取星期几的名称
 */
function getDayName(dayOfWeek: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayOfWeek] || "Unknown";
}

/**
 * 查找下一个特定时间点
 */
export function nextOccurrence(
  options: NextOccurrenceOptions,
): NextOccurrenceResult {
  // 验证至少提供一个条件
  if (
    options.dayOfWeek === undefined &&
    options.dayOfMonth === undefined &&
    !options.time
  ) {
    throw new Error(
      "At least one of dayOfWeek, dayOfMonth, or time must be specified",
    );
  }

  // 验证星期几
  if (
    options.dayOfWeek !== undefined &&
    (options.dayOfWeek < 0 || options.dayOfWeek > 6)
  ) {
    throw new Error("dayOfWeek must be between 0 (Sunday) and 6 (Saturday)");
  }

  // 验证日期
  if (
    options.dayOfMonth !== undefined &&
    (options.dayOfMonth < 1 || options.dayOfMonth > 31)
  ) {
    throw new Error("dayOfMonth must be between 1 and 31");
  }

  // 验证时区
  const timezone = options.timezone || DEFAULTS.TIMEZONE;
  if (timezone !== "local" && !isValidTimezone(timezone)) {
    throw new Error(`Invalid timezone: ${timezone}`);
  }

  // 获取基准时间
  let baseDate: Date;
  let baseTimeString: string;

  if (options.baseTime) {
    if (!isValidTimeString(options.baseTime)) {
      throw new Error(`Invalid base time: ${options.baseTime}`);
    }
    baseDate = new Date(options.baseTime);
    baseTimeString = options.baseTime;
  } else {
    baseDate = new Date();
    baseTimeString = baseDate.toISOString();
  }

  let targetDate = new Date(baseDate);
  let description = "Next ";

  // 查找下一个匹配的日期
  const maxIterations = 365; // 最多查找一年
  let iterations = 0;

  while (iterations < maxIterations) {
    targetDate.setDate(targetDate.getDate() + 1);
    iterations++;

    // 检查星期几
    if (
      options.dayOfWeek !== undefined &&
      targetDate.getDay() !== options.dayOfWeek
    ) {
      continue;
    }

    // 检查日期
    if (
      options.dayOfMonth !== undefined &&
      targetDate.getDate() !== options.dayOfMonth
    ) {
      continue;
    }

    // 如果所有条件都匹配，找到了
    break;
  }

  // 如果指定了时间，设置时间
  if (options.time) {
    const timeMatch = options.time.match(/^(\d{1,2}):(\d{2})$/);
    if (!timeMatch) {
      throw new Error(
        'Invalid time format. Use HH:mm format (e.g., "14:30")',
      );
    }
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    targetDate.setHours(hours, minutes, 0, 0);
  }

  // 构建描述
  if (options.dayOfWeek !== undefined) {
    description += getDayName(options.dayOfWeek);
  }
  if (options.dayOfMonth !== undefined) {
    description +=
      (options.dayOfWeek !== undefined ? " on the " : "") +
      `${options.dayOfMonth}${getOrdinalSuffix(options.dayOfMonth)}`;
  }
  if (options.time) {
    description += ` at ${options.time}`;
  }

  const daysUntil = Math.floor(
    (targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return {
    baseTime: baseTimeString,
    targetDescription: description.trim(),
    nextOccurrence: targetDate.toISOString(),
    daysUntil,
    timezone,
  };
}

/**
 * 获取序数后缀
 */
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
