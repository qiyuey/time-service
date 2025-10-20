/**
 * 时间计算工具函数测试
 */

import { describe, expect, test } from "bun:test";
import { addTime, timeDiff, convertTimezone } from "./time-calculator";
import { TIME_FORMATS, TIME_DIFF_UNITS } from "./config";

describe("addTime", () => {
  test("should add days to current time", () => {
    const result = addTime({
      amount: 3,
      unit: TIME_DIFF_UNITS.DAYS,
    });

    expect(result.amount).toBe(3);
    expect(result.unit).toBe(TIME_DIFF_UNITS.DAYS);
    expect(result.format).toBe(TIME_FORMATS.ISO);
    expect(result.originalTime).toBeDefined();
    expect(result.resultTime).toBeDefined();
  });

  test("should subtract hours from base time", () => {
    const baseTime = "2024-01-15T12:00:00Z";
    const result = addTime({
      amount: -2,
      unit: TIME_DIFF_UNITS.HOURS,
      baseTime: baseTime,
    });

    expect(result.originalTime).toBe(baseTime);
    expect(result.amount).toBe(-2);
    expect(result.unit).toBe(TIME_DIFF_UNITS.HOURS);
  });

  test("should add minutes with timezone", () => {
    const result = addTime({
      amount: 30,
      unit: TIME_DIFF_UNITS.MINUTES,
      timezone: "Asia/Shanghai",
    });

    expect(result.timezone).toBe("Asia/Shanghai");
    expect(result.amount).toBe(30);
  });

  test("should format result as unix timestamp", () => {
    const result = addTime({
      amount: 1,
      unit: TIME_DIFF_UNITS.DAYS,
      format: TIME_FORMATS.UNIX,
    });

    expect(result.format).toBe(TIME_FORMATS.UNIX);
    expect(result.resultTime).toMatch(/^\d{10}$/);
  });

  test("should throw error for invalid unit", () => {
    expect(() => {
      addTime({
        amount: 1,
        unit: "invalid",
      });
    }).toThrow("Invalid unit");
  });

  test("should throw error for invalid timezone", () => {
    expect(() => {
      addTime({
        amount: 1,
        unit: TIME_DIFF_UNITS.DAYS,
        timezone: "Invalid/Timezone",
      });
    }).toThrow("Invalid timezone");
  });

  test("should throw error for invalid base time", () => {
    expect(() => {
      addTime({
        amount: 1,
        unit: TIME_DIFF_UNITS.DAYS,
        baseTime: "not a valid time",
      });
    }).toThrow("Invalid base time");
  });

  test("should add weeks correctly", () => {
    const baseTime = "2024-01-01T00:00:00Z";
    const result = addTime({
      amount: 2,
      unit: TIME_DIFF_UNITS.WEEKS,
      baseTime: baseTime,
    });

    expect(result.amount).toBe(2);
    expect(result.unit).toBe(TIME_DIFF_UNITS.WEEKS);
  });
});

describe("timeDiff", () => {
  test("should calculate difference in milliseconds", () => {
    const result = timeDiff({
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:00:01Z",
    });

    expect(result.difference).toBe(1000);
    expect(result.unit).toBe(TIME_DIFF_UNITS.MILLISECONDS);
    expect(result.absoluteDifference).toBe(1000);
  });

  test("should calculate difference in days", () => {
    const result = timeDiff({
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-04T00:00:00Z",
      unit: TIME_DIFF_UNITS.DAYS,
    });

    expect(result.difference).toBe(3);
    expect(result.unit).toBe(TIME_DIFF_UNITS.DAYS);
  });

  test("should handle negative differences", () => {
    const result = timeDiff({
      startTime: "2024-01-04T00:00:00Z",
      endTime: "2024-01-01T00:00:00Z",
      unit: TIME_DIFF_UNITS.DAYS,
    });

    expect(result.difference).toBe(-3);
    expect(result.absoluteDifference).toBe(3);
  });

  test("should calculate difference in hours", () => {
    const result = timeDiff({
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T05:00:00Z",
      unit: TIME_DIFF_UNITS.HOURS,
    });

    expect(result.difference).toBe(5);
    expect(result.unit).toBe(TIME_DIFF_UNITS.HOURS);
  });

  test("should calculate difference in weeks", () => {
    const result = timeDiff({
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-15T00:00:00Z",
      unit: TIME_DIFF_UNITS.WEEKS,
    });

    expect(result.difference).toBe(2);
    expect(result.unit).toBe(TIME_DIFF_UNITS.WEEKS);
  });

  test("should throw error for invalid start time", () => {
    expect(() => {
      timeDiff({
        startTime: "invalid",
        endTime: "2024-01-01T00:00:00Z",
      });
    }).toThrow("Invalid start time");
  });

  test("should throw error for invalid end time", () => {
    expect(() => {
      timeDiff({
        startTime: "2024-01-01T00:00:00Z",
        endTime: "invalid",
      });
    }).toThrow("Invalid end time");
  });

  test("should throw error for invalid unit", () => {
    expect(() => {
      timeDiff({
        startTime: "2024-01-01T00:00:00Z",
        endTime: "2024-01-02T00:00:00Z",
        unit: "invalid",
      });
    }).toThrow("Invalid unit");
  });
});

describe("convertTimezone", () => {
  test("should convert time to different timezone", () => {
    const result = convertTimezone({
      time: "2024-01-01T00:00:00Z",
      toTimezone: "Asia/Shanghai",
    });

    expect(result.convertedTimezone).toBe("Asia/Shanghai");
    expect(result.originalTimezone).toBe("UTC");
    expect(result.format).toBe(TIME_FORMATS.ISO);
  });

  test("should convert with specified source timezone", () => {
    const result = convertTimezone({
      time: "2024-01-01T00:00:00Z",
      fromTimezone: "America/New_York",
      toTimezone: "Asia/Tokyo",
    });

    expect(result.originalTimezone).toBe("America/New_York");
    expect(result.convertedTimezone).toBe("Asia/Tokyo");
  });

  test("should format result as readable", () => {
    const result = convertTimezone({
      time: "2024-01-01T00:00:00Z",
      toTimezone: "Europe/London",
      format: TIME_FORMATS.READABLE,
    });

    expect(result.format).toBe(TIME_FORMATS.READABLE);
    expect(result.convertedTime).toContain(",");
  });

  test("should throw error for invalid time", () => {
    expect(() => {
      convertTimezone({
        time: "invalid time",
        toTimezone: "Asia/Shanghai",
      });
    }).toThrow("Invalid time");
  });

  test("should throw error for invalid target timezone", () => {
    expect(() => {
      convertTimezone({
        time: "2024-01-01T00:00:00Z",
        toTimezone: "Invalid/Timezone",
      });
    }).toThrow("Invalid target timezone");
  });

  test("should throw error for invalid source timezone", () => {
    expect(() => {
      convertTimezone({
        time: "2024-01-01T00:00:00Z",
        fromTimezone: "Invalid/Timezone",
        toTimezone: "Asia/Shanghai",
      });
    }).toThrow("Invalid source timezone");
  });

  test("should handle unix timestamp format", () => {
    const result = convertTimezone({
      time: "2024-01-01T00:00:00Z",
      toTimezone: "Asia/Shanghai",
      format: TIME_FORMATS.UNIX,
    });

    expect(result.format).toBe(TIME_FORMATS.UNIX);
    expect(result.convertedTime).toMatch(/^\d{10}$/);
  });
});
