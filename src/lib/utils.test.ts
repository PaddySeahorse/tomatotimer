import { expect, test, mock } from "bun:test";

// Mocking dependencies because node_modules are not available
mock.module("clsx", () => ({
  clsx: (...inputs: unknown[]) => {
    const result: string[] = [];

    function process(input: unknown) {
      if (!input) return;
      if (typeof input === "string" || typeof input === "number") {
        result.push(String(input));
      } else if (Array.isArray(input)) {
        input.forEach(process);
      } else if (typeof input === "object") {
        Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
          if (value) result.push(key);
        });
      }
    }

    inputs.forEach(process);
    return result.join(" ");
  },
}));

mock.module("tailwind-merge", () => ({
  twMerge: (input: string) => {
    const classes = input.split(" ");
    const seen = new Map();
    const result: string[] = [];

    classes.forEach((cls) => {
      const parts = cls.split("-");
      if (parts.length >= 2) {
        const prefix = parts.slice(0, -1).join("-");
        seen.set(prefix, cls);
      } else {
        result.push(cls);
      }
    });

    return [...result, ...Array.from(seen.values())].join(" ");
  },
}));

test("cn utility function tests", async () => {
  // Use dynamic import to ensure mocks are active and handle missing node_modules
  const { cn } = await import("./utils");

  expect(cn("base", "extra")).toContain("base");
  expect(cn("base", "extra")).toContain("extra");

  const conditional = cn("base", true && "is-visible", false && "is-hidden");
  expect(conditional).toContain("base");
  expect(conditional).toContain("is-visible");
  expect(conditional).not.toContain("is-hidden");

  const objectSyntax = cn("base", { "is-active": true, "is-disabled": false });
  expect(objectSyntax).toContain("base");
  expect(objectSyntax).toContain("is-active");
  expect(objectSyntax).not.toContain("is-disabled");

  const arraySyntax = cn(["a", "b"], "c");
  expect(arraySyntax).toContain("a");
  expect(arraySyntax).toContain("b");
  expect(arraySyntax).toContain("c");

  expect(cn("a", null, undefined, "", false)).toBe("a");

  // Conflict resolution check
  expect(cn("px-2", "px-4")).toBe("px-4");
});
