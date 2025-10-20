/**
 * MCP 工具处理器测试
 */

import { describe, expect, test } from "bun:test";
import { handleToolCall } from "./tool-handlers";
import { TOOL_NAMES, TIME_FORMATS, TIMESTAMP_UNITS } from "./config";

describe("handleToolCall", () => {
  test("should handle get_current_time with default parameters", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
      arguments: {},
    });

    expect(result.isError).toBeUndefined();
    expect(result.content).toHaveLength(1);
    const item = result.content[0]!;
    expect(item.type).toBe("text");

    const data = JSON.parse(item.text);
    expect(data.format).toBe(TIME_FORMATS.ISO);
    expect(data.time).toBeDefined();
    expect(data.timezone).toBe("local");
  });

  test("should handle get_current_time with ISO format", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
      arguments: { format: TIME_FORMATS.ISO },
    });

    const item2 = result.content[0]!;
    const data = JSON.parse(item2.text);
    expect(data.format).toBe(TIME_FORMATS.ISO);
    expect(data.time).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test("should handle get_current_time with Unix format", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
      arguments: { format: TIME_FORMATS.UNIX },
    });

    const item3 = result.content[0]!;
    const data = JSON.parse(item3.text);
    expect(data.format).toBe(TIME_FORMATS.UNIX);
    expect(data.time).toMatch(/^\d{10}$/);
  });

  test("should handle get_current_time with timezone", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
      arguments: {
        format: TIME_FORMATS.READABLE,
        timezone: "Asia/Tokyo",
      },
    });

    const item4 = result.content[0]!;
    const data = JSON.parse(item4.text);
    expect(data.timezone).toBe("Asia/Tokyo");
  });

  test("should handle get_timestamp with default parameters", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_TIMESTAMP,
      arguments: {},
    });

    expect(result.isError).toBeUndefined();
    const item5 = result.content[0]!;
    const data = JSON.parse(item5.text);
    expect(data.unit).toBe(TIMESTAMP_UNITS.MILLISECONDS);
    expect(data.timestamp).toBeGreaterThan(1700000000000);
  });

  test("should handle get_timestamp in seconds", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_TIMESTAMP,
      arguments: { unit: TIMESTAMP_UNITS.SECONDS },
    });

    const item6 = result.content[0]!;
    const data = JSON.parse(item6.text);
    expect(data.unit).toBe(TIMESTAMP_UNITS.SECONDS);
    expect(data.timestamp.toString()).toMatch(/^\d{10}$/);
  });

  test("should handle get_timestamp in milliseconds", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_TIMESTAMP,
      arguments: { unit: TIMESTAMP_UNITS.MILLISECONDS },
    });

    const item7 = result.content[0]!;
    const data = JSON.parse(item7.text);
    expect(data.unit).toBe(TIMESTAMP_UNITS.MILLISECONDS);
    expect(data.timestamp.toString()).toMatch(/^\d{13}$/);
  });

  test("should return error for unknown tool", () => {
    const result = handleToolCall({
      name: "unknown_tool",
      arguments: {},
    });

    expect(result.isError).toBe(true);
    const item8 = result.content[0]!;
    expect(item8.text).toContain("Unknown tool");
  });

  test("should handle missing arguments", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
    });

    expect(result.isError).toBeUndefined();
    const item9 = result.content[0]!;
    const data = JSON.parse(item9.text);
    expect(data.time).toBeDefined();
  });

  test("should handle add_time tool", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.ADD_TIME,
      arguments: {
        amount: 5,
        unit: "days",
        baseTime: "2024-01-15T10:00:00Z",
      },
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0]!.text);
    expect(data.amount).toBe(5);
    expect(data.unit).toBe("days");
    expect(data.originalTime).toBe("2024-01-15T10:00:00Z");
    expect(data.resultTime).toBeDefined();
  });

  test("should handle time_diff tool", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.TIME_DIFF,
      arguments: {
        startTime: "2024-01-15T10:00:00Z",
        endTime: "2024-01-16T10:00:00Z",
        unit: "hours",
      },
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0]!.text);
    expect(data.difference).toBe(24);
    expect(data.unit).toBe("hours");
  });

  test("should handle convert_timezone tool", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.CONVERT_TIMEZONE,
      arguments: {
        time: "2024-01-15T10:00:00Z",
        toTimezone: "Asia/Tokyo",
        format: "iso",
      },
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0]!.text);
    expect(data.convertedTimezone).toBe("Asia/Tokyo");
    expect(data.format).toBe("iso");
  });

  test("should handle get_multiple_timezones tool", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_MULTIPLE_TIMEZONES,
      arguments: {
        timezones: ["America/New_York", "Europe/London", "Asia/Tokyo"],
      },
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0]!.text);
    expect(data.timezones).toHaveLength(3);
    expect(data.timezones[0].timezone).toBe("America/New_York");
  });

  test("should handle get_business_days tool", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_BUSINESS_DAYS,
      arguments: {
        startDate: "2024-01-15T10:00:00Z",
        days: 5,
      },
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0]!.text);
    expect(data.days).toBe(5);
    expect(data.resultDate).toBeDefined();
  });

  test("should handle next_occurrence tool", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.NEXT_OCCURRENCE,
      arguments: {
        dayOfWeek: 1,
        time: "14:30",
        baseTime: "2024-01-15T10:00:00Z",
      },
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0]!.text);
    expect(data.nextOccurrence).toBeDefined();
    expect(data.targetDescription).toContain("Monday");
  });

  test("should handle errors in tool execution", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.ADD_TIME,
      arguments: {
        amount: 5,
        unit: "invalid_unit",
      },
    });

    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toContain("Error:");
  });
});
