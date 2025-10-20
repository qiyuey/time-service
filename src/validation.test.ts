/**
 * 输入验证测试
 */

import { describe, expect, test } from "bun:test";
import {
  isValidTimezone,
  validateCustomFormat,
  isValidTimeFormat,
  isValidTimestampUnit,
  isValidTimeDiffUnit,
  isValidTimeString,
} from "./validation";

describe("isValidTimezone", () => {
  test("should accept valid timezones", () => {
    expect(isValidTimezone("America/New_York")).toBe(true);
    expect(isValidTimezone("Asia/Shanghai")).toBe(true);
    expect(isValidTimezone("Europe/London")).toBe(true);
    expect(isValidTimezone("UTC")).toBe(true);
  });

  test("should reject invalid timezones", () => {
    expect(isValidTimezone("Invalid/Timezone")).toBe(false);
    expect(isValidTimezone("NotATimezone")).toBe(false);
    expect(isValidTimezone("")).toBe(false);
  });
});

describe("validateCustomFormat", () => {
  test("should accept valid JSON format options", () => {
    const result = validateCustomFormat(
      '{"year": "numeric", "month": "2-digit"}',
    );
    expect(result.valid).toBe(true);
    expect(result.options).toEqual({ year: "numeric", month: "2-digit" });
  });

  test("should reject invalid JSON", () => {
    const result = validateCustomFormat("not json");
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  test("should reject non-object JSON", () => {
    const result = validateCustomFormat('"string"');
    expect(result.valid).toBe(false);
    expect(result.error).toContain("must be a JSON object");
  });

  test("should accept valid DateTimeFormat options", () => {
    const result = validateCustomFormat(
      '{"year": "numeric", "month": "long", "day": "numeric"}',
    );
    expect(result.valid).toBe(true);
    expect(result.options).toBeDefined();
  });
});

describe("isValidTimeFormat", () => {
  test("should accept valid formats", () => {
    expect(isValidTimeFormat("iso")).toBe(true);
    expect(isValidTimeFormat("unix")).toBe(true);
    expect(isValidTimeFormat("readable")).toBe(true);
    expect(isValidTimeFormat("custom")).toBe(true);
  });

  test("should accept uppercase formats", () => {
    expect(isValidTimeFormat("ISO")).toBe(true);
    expect(isValidTimeFormat("UNIX")).toBe(true);
  });

  test("should reject invalid formats", () => {
    expect(isValidTimeFormat("invalid")).toBe(false);
    expect(isValidTimeFormat("")).toBe(false);
  });
});

describe("isValidTimestampUnit", () => {
  test("should accept valid units", () => {
    expect(isValidTimestampUnit("seconds")).toBe(true);
    expect(isValidTimestampUnit("milliseconds")).toBe(true);
  });

  test("should accept uppercase units", () => {
    expect(isValidTimestampUnit("SECONDS")).toBe(true);
    expect(isValidTimestampUnit("MILLISECONDS")).toBe(true);
  });

  test("should reject invalid units", () => {
    expect(isValidTimestampUnit("minutes")).toBe(false);
    expect(isValidTimestampUnit("invalid")).toBe(false);
  });
});

describe("isValidTimeDiffUnit", () => {
  test("should accept valid units", () => {
    expect(isValidTimeDiffUnit("milliseconds")).toBe(true);
    expect(isValidTimeDiffUnit("seconds")).toBe(true);
    expect(isValidTimeDiffUnit("minutes")).toBe(true);
    expect(isValidTimeDiffUnit("hours")).toBe(true);
    expect(isValidTimeDiffUnit("days")).toBe(true);
    expect(isValidTimeDiffUnit("weeks")).toBe(true);
  });

  test("should reject invalid units", () => {
    expect(isValidTimeDiffUnit("months")).toBe(false);
    expect(isValidTimeDiffUnit("invalid")).toBe(false);
  });
});

describe("isValidTimeString", () => {
  test("should accept valid time strings", () => {
    expect(isValidTimeString("2024-01-01T00:00:00Z")).toBe(true);
    expect(isValidTimeString("2024-01-01")).toBe(true);
    expect(isValidTimeString("Mon, 01 Jan 2024 00:00:00 GMT")).toBe(true);
  });

  test("should reject invalid time strings", () => {
    expect(isValidTimeString("not a date")).toBe(false);
    expect(isValidTimeString("")).toBe(false);
    expect(isValidTimeString("invalid-date-format")).toBe(false);
  });
});
