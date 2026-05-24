import { expect, test, mock } from "bun:test";

// Mock React and JSX runtimes
mock.module("react", () => {
  const React = {
    createElement: (type: any, props: any, ...children: any[]) => {
      return { type, props, children };
    },
    useContext: () => ({}),
    useId: () => "test-id",
    useMemo: (factory: any) => factory(),
    createContext: () => ({
      Provider: ({ children }: any) => children,
    }),
    Fragment: "Fragment",
  };
  return {
    ...React,
    default: React,
  };
});

mock.module("react/jsx-runtime", () => ({
  jsx: (type: any, props: any) => {
    const { children, ...rest } = props;
    return { type, props: rest, children };
  },
  jsxs: (type: any, props: any) => {
    const { children, ...rest } = props;
    return { type, props: rest, children };
  },
  Fragment: "Fragment",
}));

mock.module("react/jsx-dev-runtime", () => ({
  jsxDEV: (type: any, props: any) => {
    const { children, ...rest } = props;
    return { type, props: rest, children };
  },
  Fragment: "Fragment",
}));

// Mock clsx and tailwind-merge
mock.module("clsx", () => ({
  clsx: () => "",
}));
mock.module("tailwind-merge", () => ({
  twMerge: () => "",
}));

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

  expect(output.type).toBe("style");
  expect(output.props.dangerouslySetInnerHTML).toBeUndefined();

  const finalStyles = Array.isArray(output.children) ? output.children[0] : output.children;

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
