/**
 * 时间格式化工具函数测试
 */

import { describe, expect, test } from "bun:test";
import { formatTime, getTimestamp } from "./time-formatter";
import { TIME_FORMATS, TIMESTAMP_UNITS } from "./config";

describe("formatTime", () => {
  test("should return ISO format by default", () => {
    const result = formatTime();
    expect(result.format).toBe(TIME_FORMATS.ISO);
    expect(result.time).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });

  test("should format time in ISO format", () => {
    const result = formatTime({ format: TIME_FORMATS.ISO });
    expect(result.format).toBe(TIME_FORMATS.ISO);
    expect(result.time).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test("should format time in Unix timestamp", () => {
    const result = formatTime({ format: TIME_FORMATS.UNIX });
    expect(result.format).toBe(TIME_FORMATS.UNIX);
    expect(result.time).toMatch(/^\d{10}$/);
    const timestamp = parseInt(result.time);
    expect(timestamp).toBeGreaterThan(1700000000); // After 2023
  });

  test("should format time in readable format", () => {
    const result = formatTime({ format: TIME_FORMATS.READABLE });
    expect(result.format).toBe(TIME_FORMATS.READABLE);
    expect(result.time).toContain(","); // Readable format contains commas
  });

  test("should respect timezone parameter", () => {
    const result = formatTime({
      format: TIME_FORMATS.READABLE,
      timezone: "Asia/Shanghai",
    });
    expect(result.timezone).toBe("Asia/Shanghai");
  });

  test("should handle custom format with valid JSON", () => {
    const customFormat = JSON.stringify({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const result = formatTime({
      format: TIME_FORMATS.CUSTOM,
      customFormat,
    });
    expect(result.format).toBe(TIME_FORMATS.CUSTOM);
    expect(result.time).toMatch(/\d+\/\d+\/\d+/);
  });

  test("should throw error for invalid custom format", () => {
    expect(() => {
      formatTime({
        format: TIME_FORMATS.CUSTOM,
        customFormat: "invalid json",
      });
    }).toThrow("Invalid custom format");
  });

  test("should use local timezone by default", () => {
    const result = formatTime();
    expect(result.timezone).toBe("local");
  });
});

describe("getTimestamp", () => {
  test("should return milliseconds by default", () => {
    const result = getTimestamp();
    expect(result.unit).toBe(TIMESTAMP_UNITS.MILLISECONDS);
    expect(result.timestamp).toBeGreaterThan(1700000000000); // After 2023
  });

  test("should return timestamp in milliseconds", () => {
    const result = getTimestamp({ unit: TIMESTAMP_UNITS.MILLISECONDS });
    expect(result.unit).toBe(TIMESTAMP_UNITS.MILLISECONDS);
    expect(result.timestamp.toString()).toMatch(/^\d{13}$/);
  });

  test("should return timestamp in seconds", () => {
    const result = getTimestamp({ unit: TIMESTAMP_UNITS.SECONDS });
    expect(result.unit).toBe(TIMESTAMP_UNITS.SECONDS);
    expect(result.timestamp.toString()).toMatch(/^\d{10}$/);
  });

  test("should return consistent timestamps", () => {
    const result1 = getTimestamp({ unit: TIMESTAMP_UNITS.SECONDS });
    const result2 = getTimestamp({ unit: TIMESTAMP_UNITS.MILLISECONDS });
    const diff = Math.abs(result2.timestamp / 1000 - result1.timestamp);
    expect(diff).toBeLessThan(1); // Should be within 1 second
  });
});
