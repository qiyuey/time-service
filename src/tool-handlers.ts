/**
 * MCP 工具处理器
 */

import { formatTime, getTimestamp } from "./time-formatter";
import { addTime, timeDiff, convertTimezone } from "./time-calculator";
import { TOOL_NAMES } from "./config";
import type { ToolCallParams, ToolResult } from "./types";

/**
 * 创建成功响应
 */
function createSuccessResponse(data: unknown): ToolResult {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * 创建错误响应
 */
function createErrorResponse(error: unknown): ToolResult {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return {
    content: [
      {
        type: "text",
        text: `Error: ${errorMessage}`,
      },
    ],
    isError: true,
  };
}

/**
 * 处理 get_current_time 工具
 */
function handleGetCurrentTime(args?: Record<string, unknown>): ToolResult {
  const result = formatTime({
    format: args?.format as string,
    timezone: args?.timezone as string,
    customFormat: args?.customFormat as string,
  });
  return createSuccessResponse(result);
}

/**
 * 处理 get_timestamp 工具
 */
function handleGetTimestamp(args?: Record<string, unknown>): ToolResult {
  const result = getTimestamp({
    unit: args?.unit as string,
  });
  return createSuccessResponse(result);
}

/**
 * 处理 add_time 工具
 */
function handleAddTime(args?: Record<string, unknown>): ToolResult {
  const result = addTime({
    amount: args?.amount as number,
    unit: args?.unit as string,
    baseTime: args?.baseTime as string | undefined,
    format: args?.format as string | undefined,
    timezone: args?.timezone as string | undefined,
  });
  return createSuccessResponse(result);
}

/**
 * 处理 time_diff 工具
 */
function handleTimeDiff(args?: Record<string, unknown>): ToolResult {
  const result = timeDiff({
    startTime: args?.startTime as string,
    endTime: args?.endTime as string,
    unit: args?.unit as string | undefined,
  });
  return createSuccessResponse(result);
}

/**
 * 处理 convert_timezone 工具
 */
function handleConvertTimezone(args?: Record<string, unknown>): ToolResult {
  const result = convertTimezone({
    time: args?.time as string,
    fromTimezone: args?.fromTimezone as string | undefined,
    toTimezone: args?.toTimezone as string,
    format: args?.format as string | undefined,
  });
  return createSuccessResponse(result);
}

/**
 * 工具处理器映射表
 */
const toolHandlers: Record<
  string,
  (args?: Record<string, unknown>) => ToolResult
> = {
  [TOOL_NAMES.GET_CURRENT_TIME]: handleGetCurrentTime,
  [TOOL_NAMES.GET_TIMESTAMP]: handleGetTimestamp,
  [TOOL_NAMES.ADD_TIME]: handleAddTime,
  [TOOL_NAMES.TIME_DIFF]: handleTimeDiff,
  [TOOL_NAMES.CONVERT_TIMEZONE]: handleConvertTimezone,
};

/**
 * 处理工具调用
 */
export function handleToolCall(params: ToolCallParams): ToolResult {
  try {
    const handler = toolHandlers[params.name];

    if (!handler) {
      throw new Error(`Unknown tool: ${params.name}`);
    }

    return handler(params.arguments);
  } catch (error) {
    return createErrorResponse(error);
  }
}
