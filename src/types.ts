/**
 * 类型定义
 */

/**
 * 时间格式化选项
 */
export interface TimeFormatOptions {
  format?: string;
  timezone?: string;
  customFormat?: string;
}

/**
 * 时间戳选项
 */
export interface TimestampOptions {
  unit?: string;
}

/**
 * 格式化时间结果
 */
export interface FormattedTime {
  time: string;
  format: string;
  timezone: string;
}

/**
 * 时间戳结果
 */
export interface TimestampResult {
  timestamp: number;
  unit: string;
}

/**
 * 工具调用参数
 */
export interface ToolCallParams {
  name: string;
  arguments?: Record<string, unknown>;
}

/**
 * 工具执行结果
 */
export interface ToolResult {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}

/**
 * 时间加减选项
 */
export interface AddTimeOptions {
  amount: number;
  unit: string;
  baseTime?: string;
  format?: string;
  timezone?: string;
}

/**
 * 时间加减结果
 */
export interface AddTimeResult {
  originalTime: string;
  resultTime: string;
  amount: number;
  unit: string;
  format: string;
  timezone: string;
}

/**
 * 时间差选项
 */
export interface TimeDiffOptions {
  startTime: string;
  endTime: string;
  unit?: string;
}

/**
 * 时间差结果
 */
export interface TimeDiffResult {
  startTime: string;
  endTime: string;
  difference: number;
  unit: string;
  absoluteDifference: number;
}

/**
 * 时区转换选项
 */
export interface ConvertTimezoneOptions {
  time: string;
  fromTimezone?: string;
  toTimezone: string;
  format?: string;
}

/**
 * 时区转换结果
 */
export interface ConvertTimezoneResult {
  originalTime: string;
  originalTimezone: string;
  convertedTime: string;
  convertedTimezone: string;
  format: string;
}
