/**
 * 输入验证工具函数
 */

/**
 * 验证时区是否有效
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    // 尝试使用时区创建格式化器，如果失败则时区无效
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证自定义格式 JSON 是否有效
 */
export function validateCustomFormat(
  customFormat: string,
): { valid: boolean; error?: string; options?: Intl.DateTimeFormatOptions } {
  try {
    const options = JSON.parse(customFormat);

    // 检查是否为对象
    if (typeof options !== "object" || options === null) {
      return {
        valid: false,
        error: "Custom format must be a JSON object",
      };
    }

    // 尝试使用这些选项创建格式化器来验证
    new Intl.DateTimeFormat(undefined, options);

    return {
      valid: true,
      options: options as Intl.DateTimeFormatOptions,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Invalid JSON format";
    return {
      valid: false,
      error: errorMessage,
    };
  }
}

/**
 * 验证时间格式类型
 */
export function isValidTimeFormat(format: string): boolean {
  const validFormats = ["iso", "unix", "readable", "custom"];
  return validFormats.includes(format.toLowerCase());
}

/**
 * 验证时间戳单位
 */
export function isValidTimestampUnit(unit: string): boolean {
  const validUnits = ["seconds", "milliseconds"];
  return validUnits.includes(unit.toLowerCase());
}

/**
 * 验证时间差单位
 */
export function isValidTimeDiffUnit(unit: string): boolean {
  const validUnits = [
    "milliseconds",
    "seconds",
    "minutes",
    "hours",
    "days",
    "weeks",
  ];
  return validUnits.includes(unit.toLowerCase());
}

/**
 * 验证时间字符串是否可解析
 */
export function isValidTimeString(timeString: string): boolean {
  const timestamp = Date.parse(timeString);
  return !isNaN(timestamp);
}
