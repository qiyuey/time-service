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
    expect(result.content[0].type).toBe("text");

    const data = JSON.parse(result.content[0].text);
    expect(data.format).toBe(TIME_FORMATS.ISO);
    expect(data.time).toBeDefined();
    expect(data.timezone).toBe("local");
  });

  test("should handle get_current_time with ISO format", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
      arguments: { format: TIME_FORMATS.ISO },
    });

    const data = JSON.parse(result.content[0].text);
    expect(data.format).toBe(TIME_FORMATS.ISO);
    expect(data.time).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test("should handle get_current_time with Unix format", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
      arguments: { format: TIME_FORMATS.UNIX },
    });

    const data = JSON.parse(result.content[0].text);
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

    const data = JSON.parse(result.content[0].text);
    expect(data.timezone).toBe("Asia/Tokyo");
  });

  test("should handle get_timestamp with default parameters", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_TIMESTAMP,
      arguments: {},
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0].text);
    expect(data.unit).toBe(TIMESTAMP_UNITS.MILLISECONDS);
    expect(data.timestamp).toBeGreaterThan(1700000000000);
  });

  test("should handle get_timestamp in seconds", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_TIMESTAMP,
      arguments: { unit: TIMESTAMP_UNITS.SECONDS },
    });

    const data = JSON.parse(result.content[0].text);
    expect(data.unit).toBe(TIMESTAMP_UNITS.SECONDS);
    expect(data.timestamp.toString()).toMatch(/^\d{10}$/);
  });

  test("should handle get_timestamp in milliseconds", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_TIMESTAMP,
      arguments: { unit: TIMESTAMP_UNITS.MILLISECONDS },
    });

    const data = JSON.parse(result.content[0].text);
    expect(data.unit).toBe(TIMESTAMP_UNITS.MILLISECONDS);
    expect(data.timestamp.toString()).toMatch(/^\d{13}$/);
  });

  test("should return error for unknown tool", () => {
    const result = handleToolCall({
      name: "unknown_tool",
      arguments: {},
    });

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain("Unknown tool");
  });

  test("should handle missing arguments", () => {
    const result = handleToolCall({
      name: TOOL_NAMES.GET_CURRENT_TIME,
    });

    expect(result.isError).toBeUndefined();
    const data = JSON.parse(result.content[0].text);
    expect(data.time).toBeDefined();
  });
});
