import { expect, test, mock, beforeAll } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { render } from "@testing-library/react";
import React from "react";

beforeAll(() => {
  GlobalRegistrator.register();
});

// Mock recharts
mock.module("recharts", () => ({
  ResponsiveContainer: ({ children }: any) => children,
  Tooltip: () => null,
  Legend: () => null,
}));

test("ChartStyle sanitizes inputs and avoids dangerouslySetInnerHTML", async () => {
  const { ChartStyle } = await import("./chart");

  const maliciousConfig = {
    "normal": { color: "#ff0000" },
    "malicious-key; background: url(x)": { color: "#00ff00" },
    "injection": { color: "#0000ff; } body { background: red; } " },
  };

  const output = ChartStyle({
    id: "chart-id;}</style><script>alert(1)</script>",
    config: maliciousConfig,
  });

  expect(output?.type).toBe("style");
  expect(output?.props.dangerouslySetInnerHTML).toBeUndefined();

  const finalStyles = output ? (Array.isArray((output as any).children) ? (output as any).children[0] : (output as any).children) : "";

  // Verify ID sanitization (regex [^\w-] removes ;)
  expect(finalStyles).toContain("[data-chart=chart-idstylescriptalert1script]");
  expect(finalStyles).not.toContain("alert(1)");

  // Verify Key sanitization
  expect(finalStyles).toContain("--color-malicious-keybackgroundurlx");

  // Verify Color sanitization
  // The value part should have } removed.
  expect(finalStyles).toContain("--color-injection: #0000ff  body { background: red  ;");

  // Check that the injected closing brace and body block is neutralized within the value
  // The only } allowed are the ones we generate for the CSS blocks.
  // We can count them. There are 2 themes, and each has one block. So 2 '}' total.
  const closingBraces = finalStyles.match(/\}/g) || [];
  expect(closingBraces.length).toBe(2);
});
