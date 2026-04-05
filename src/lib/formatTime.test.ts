import { expect, test, mock } from "bun:test";

// Mock dependencies of utils.ts to allow importing formatTime
mock.module("clsx", () => ({
  clsx: () => "",
}));

mock.module("tailwind-merge", () => ({
  twMerge: () => "",
}));

test("formatTime correctly formats seconds to mm:ss", async () => {
  const { formatTime } = await import("./utils");

  expect(formatTime(0)).toBe("00:00");
  expect(formatTime(5)).toBe("00:05");
  expect(formatTime(59)).toBe("00:59");
  expect(formatTime(60)).toBe("01:00");
  expect(formatTime(75)).toBe("01:15");
  expect(formatTime(600)).toBe("10:00");
  expect(formatTime(3599)).toBe("59:59");
  expect(formatTime(3600)).toBe("60:00");
  expect(formatTime(3661)).toBe("61:01");
});
