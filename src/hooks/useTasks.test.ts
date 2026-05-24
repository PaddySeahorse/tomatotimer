import { expect, test, mock, beforeEach } from "bun:test";

class HookMock {
  private states: any[] = [];
  private index = 0;

  reset() {
    this.index = 0;
  }

  clear() {
    this.states = [];
    this.index = 0;
  }

  useState<T>(initialValue: T | (() => T)): [T, (newValue: T | ((prev: T) => T)) => void] {
    const currentIndex = this.index;
    if (this.states[currentIndex] === undefined) {
      this.states[currentIndex] = typeof initialValue === 'function' ? (initialValue as Function)() : initialValue;
    }

    const setState = (newValue: any) => {
      if (typeof newValue === 'function') {
        this.states[currentIndex] = newValue(this.states[currentIndex]);
      } else {
        this.states[currentIndex] = newValue;
      }
    };

    this.index++;
    return [this.states[currentIndex], setState];
  }

  useCallback<T extends Function>(fn: T): T {
    return fn;
  }
}

const hookMock = new HookMock();

mock.module("react", () => ({
  useState: (initial: any) => hookMock.useState(initial),
  useCallback: (fn: any) => hookMock.useCallback(fn),
  useEffect: () => {},
  useMemo: (fn: any) => fn(),
  useRef: (initial: any) => ({ current: initial }),
}));

beforeEach(() => {
  hookMock.clear();
});

test("useTasks - addTask should validate text", async () => {
  const { useTasks } = await import("./useTasks");

  const runHook = () => {
    hookMock.reset();
    return useTasks();
  };

  // Test 1: Empty text
  let hook = runHook();
  expect(hook.taskDraft.text).toBe("");

  let result = hook.addTask();
  expect(result).toBe(false);

  hook = runHook();
  expect(hook.tasks.length).toBe(0);

  // Test 2: Whitespace only
  hook = runHook();
  hook.updateTaskDraft({ text: "   " });

  hook = runHook();
  result = hook.addTask();
  expect(result).toBe(false);

  hook = runHook();
  expect(hook.tasks.length).toBe(0);

  // Test 3: Valid text
  hook = runHook();
  hook.updateTaskDraft({ text: "Valid Task" });

  hook = runHook();
  result = hook.addTask();
  expect(result).toBe(true);

  hook = runHook();
  expect(hook.tasks.length).toBe(1);
  expect(hook.tasks[0].text).toBe("Valid Task");
});
