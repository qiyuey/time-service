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
