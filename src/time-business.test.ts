/**
 * 业务时间计算工具函数测试
 */

import { describe, expect, test } from "bun:test";
import {
  getMultipleTimezones,
  getBusinessDays,
  nextOccurrence,
} from "./time-business";
import { TIME_FORMATS } from "./config";

describe("getMultipleTimezones", () => {
  test("should get time in multiple timezones", () => {
    const result = getMultipleTimezones({
      timezones: ["America/New_York", "Asia/Tokyo", "Europe/London"],
    });

    expect(result.timezones).toHaveLength(3);
    expect(result.timezones[0].timezone).toBe("America/New_York");
    expect(result.timezones[1].timezone).toBe("Asia/Tokyo");
    expect(result.timezones[2].timezone).toBe("Europe/London");
    expect(result.baseTime).toBeDefined();
  });

  test("should use specified time", () => {
    const testTime = "2024-01-01T12:00:00Z";
    const result = getMultipleTimezones({
      timezones: ["UTC", "Asia/Shanghai"],
      time: testTime,
    });

    expect(result.baseTime).toBe(testTime);
    expect(result.timezones).toHaveLength(2);
  });

  test("should format results in specified format", () => {
    const result = getMultipleTimezones({
      timezones: ["UTC"],
      format: TIME_FORMATS.UNIX,
    });

    expect(result.timezones[0].format).toBe(TIME_FORMATS.UNIX);
    expect(result.timezones[0].time).toMatch(/^\d{10}$/);
  });

  test("should include UTC offset", () => {
    const result = getMultipleTimezones({
      timezones: ["Asia/Shanghai"],
    });

    expect(result.timezones[0].utcOffset).toMatch(/^UTC[+-]\d{2}:\d{2}$/);
  });

  test("should throw error for invalid timezone", () => {
    expect(() => {
      getMultipleTimezones({
        timezones: ["Invalid/Timezone"],
      });
    }).toThrow("Invalid timezone");
  });

  test("should throw error for invalid time", () => {
    expect(() => {
      getMultipleTimezones({
        timezones: ["UTC"],
        time: "invalid time",
      });
    }).toThrow("Invalid time");
  });

  test("should throw error for invalid format", () => {
    expect(() => {
      getMultipleTimezones({
        timezones: ["UTC"],
        format: "invalid",
      });
    }).toThrow("Invalid format");
  });
});

describe("getBusinessDays", () => {
  test("should add business days excluding weekends", () => {
    const result = getBusinessDays({
      startDate: "2024-01-01T00:00:00Z", // Monday
      days: 5,
      excludeWeekends: true,
    });

    expect(result.startDate).toBe("2024-01-01T00:00:00Z");
    expect(result.days).toBe(5);
    expect(result.excludedWeekends).toBe(true);
    expect(result.resultDate).toBeDefined();
  });

  test("should subtract business days", () => {
    const result = getBusinessDays({
      startDate: "2024-01-15T00:00:00Z",
      days: -5,
    });

    expect(result.days).toBe(-5);
    expect(result.resultDate).toBeDefined();
  });

  test("should include weekends when excludeWeekends is false", () => {
    const result = getBusinessDays({
      startDate: "2024-01-01T00:00:00Z",
      days: 7,
      excludeWeekends: false,
    });

    expect(result.excludedWeekends).toBe(false);
    expect(result.totalDaysSpanned).toBe(7);
  });

  test("should calculate totalDaysSpanned correctly", () => {
    const result = getBusinessDays({
      startDate: "2024-01-01T00:00:00Z", // Monday
      days: 5, // Should span to next Monday (7 days with weekend)
      excludeWeekends: true,
    });

    expect(result.totalDaysSpanned).toBeGreaterThan(5);
  });

  test("should throw error for invalid start date", () => {
    expect(() => {
      getBusinessDays({
        startDate: "invalid date",
        days: 5,
      });
    }).toThrow("Invalid start date");
  });
});

describe("nextOccurrence", () => {
  test("should find next Monday", () => {
    const result = nextOccurrence({
      dayOfWeek: 1, // Monday
      baseTime: "2024-01-01T00:00:00Z", // Monday
    });

    expect(result.targetDescription).toContain("Monday");
    expect(result.daysUntil).toBeGreaterThan(0);
    expect(result.nextOccurrence).toBeDefined();
  });

  test("should find next 15th of month", () => {
    const result = nextOccurrence({
      dayOfMonth: 15,
      baseTime: "2024-01-01T00:00:00Z",
    });

    expect(result.targetDescription).toContain("15th");
    expect(result.nextOccurrence).toBeDefined();
  });

  test("should find next occurrence with time", () => {
    const result = nextOccurrence({
      time: "14:30",
      dayOfWeek: 1, // Monday
      baseTime: "2024-01-01T12:00:00Z",
    });

    expect(result.targetDescription).toContain("14:30");
    expect(result.nextOccurrence).toContain("14:30");
  });

  test("should find next Monday on 15th", () => {
    const result = nextOccurrence({
      dayOfWeek: 1, // Monday
      dayOfMonth: 15,
      baseTime: "2024-01-01T00:00:00Z",
    });

    expect(result.targetDescription).toContain("Monday");
    expect(result.targetDescription).toContain("15th");
  });

  test("should throw error when no conditions specified", () => {
    expect(() => {
      nextOccurrence({
        baseTime: "2024-01-01T00:00:00Z",
      });
    }).toThrow("At least one");
  });

  test("should throw error for invalid dayOfWeek", () => {
    expect(() => {
      nextOccurrence({
        dayOfWeek: 7, // Invalid (should be 0-6)
      });
    }).toThrow("dayOfWeek must be between");
  });

  test("should throw error for invalid dayOfMonth", () => {
    expect(() => {
      nextOccurrence({
        dayOfMonth: 32, // Invalid (should be 1-31)
      });
    }).toThrow("dayOfMonth must be between");
  });

  test("should throw error for invalid time format", () => {
    expect(() => {
      nextOccurrence({
        dayOfWeek: 1,
        time: "invalid",
      });
    }).toThrow("Invalid time format");
  });

  test("should throw error for invalid base time", () => {
    expect(() => {
      nextOccurrence({
        dayOfWeek: 1,
        baseTime: "invalid",
      });
    }).toThrow("Invalid base time");
  });

  test("should throw error for invalid timezone", () => {
    expect(() => {
      nextOccurrence({
        dayOfWeek: 1,
        timezone: "Invalid/Timezone",
      });
    }).toThrow("Invalid timezone");
  });

  test("should use correct ordinal suffix", () => {
    const result1 = nextOccurrence({
      dayOfMonth: 1,
      baseTime: "2024-01-15T00:00:00Z",
    });
    expect(result1.targetDescription).toContain("1st");

    const result2 = nextOccurrence({
      dayOfMonth: 2,
      baseTime: "2024-01-15T00:00:00Z",
    });
    expect(result2.targetDescription).toContain("2nd");

    const result3 = nextOccurrence({
      dayOfMonth: 3,
      baseTime: "2024-01-15T00:00:00Z",
    });
    expect(result3.targetDescription).toContain("3rd");

    const result4 = nextOccurrence({
      dayOfMonth: 11,
      baseTime: "2024-01-15T00:00:00Z",
    });
    expect(result4.targetDescription).toContain("11th");
  });
});
