/**
 * 日期工具函数测试
 */

import { describe, test, expect } from "bun:test";
import {
  unitToMilliseconds,
  millisecondsToUnit,
  formatDate,
} from "./date-utils";

describe("unitToMilliseconds", () => {
  test("should convert milliseconds correctly", () => {
    expect(unitToMilliseconds(100, "milliseconds")).toBe(100);
  });

  test("should convert seconds correctly", () => {
    expect(unitToMilliseconds(5, "seconds")).toBe(5000);
  });

  test("should convert minutes correctly", () => {
    expect(unitToMilliseconds(2, "minutes")).toBe(120000);
  });

  test("should convert hours correctly", () => {
    expect(unitToMilliseconds(1, "hours")).toBe(3600000);
  });

  test("should convert days correctly", () => {
    expect(unitToMilliseconds(1, "days")).toBe(86400000);
  });

  test("should convert weeks correctly", () => {
    expect(unitToMilliseconds(1, "weeks")).toBe(604800000);
  });

  test("should handle uppercase units", () => {
    expect(unitToMilliseconds(1, "HOURS")).toBe(3600000);
  });

  test("should throw error for unknown unit", () => {
    expect(() => unitToMilliseconds(1, "invalid")).toThrow(
      "Unknown unit: invalid",
    );
  });
});

describe("millisecondsToUnit", () => {
  test("should convert to milliseconds correctly", () => {
    expect(millisecondsToUnit(100, "milliseconds")).toBe(100);
  });

  test("should convert to seconds correctly", () => {
    expect(millisecondsToUnit(5000, "seconds")).toBe(5);
  });

  test("should convert to minutes correctly", () => {
    expect(millisecondsToUnit(120000, "minutes")).toBe(2);
  });

  test("should convert to hours correctly", () => {
    expect(millisecondsToUnit(3600000, "hours")).toBe(1);
  });

  test("should convert to days correctly", () => {
    expect(millisecondsToUnit(86400000, "days")).toBe(1);
  });

  test("should convert to weeks correctly", () => {
    expect(millisecondsToUnit(604800000, "weeks")).toBe(1);
  });

  test("should handle uppercase units", () => {
    expect(millisecondsToUnit(3600000, "HOURS")).toBe(1);
  });

  test("should throw error for unknown unit", () => {
    expect(() => millisecondsToUnit(1000, "invalid")).toThrow(
      "Unknown unit: invalid",
    );
  });
});

describe("formatDate", () => {
  const testDate = new Date("2024-01-15T10:30:00Z");

  test("should format date in ISO format", () => {
    const result = formatDate(testDate, "iso");
    expect(result).toBe("2024-01-15T10:30:00.000Z");
  });

  test("should format date in ISO format with timezone", () => {
    const result = formatDate(testDate, "iso", "America/New_York");
    expect(result).toContain("2024");
  });

  test("should format date in unix format", () => {
    const result = formatDate(testDate, "unix");
    const timestamp = parseInt(result);
    expect(timestamp).toBeGreaterThan(1705314000);
    expect(timestamp).toBeLessThan(1705316000);
  });

  test("should format date in readable format", () => {
    const result = formatDate(testDate, "readable");
    expect(result).toContain("2024");
    expect(result).toContain("January");
  });

  test("should format date in readable format with timezone", () => {
    const result = formatDate(testDate, "readable", "Asia/Tokyo");
    expect(result).toContain("2024");
  });

  test("should handle uppercase format", () => {
    const result = formatDate(testDate, "UNIX");
    const timestamp = parseInt(result);
    expect(timestamp).toBeGreaterThan(1705314000);
    expect(timestamp).toBeLessThan(1705316000);
  });

  test("should return ISO format for unknown format", () => {
    const result = formatDate(testDate, "unknown");
    expect(result).toBe("2024-01-15T10:30:00.000Z");
  });
});
