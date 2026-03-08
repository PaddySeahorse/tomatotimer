import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register();

import { expect, test, mock, afterEach, describe } from "bun:test";
import { render, cleanup, act } from "@testing-library/react";
import React from "react";
import Background from "./Background";

describe("Background component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders iframe with correct attributes", () => {
    const { container } = render(<Background theme="light" />);
    const iframe = container.querySelector("iframe");

    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toBe("/assets/background.html");
    expect(iframe?.getAttribute("title")).toBe("动态背景");
    expect(iframe?.className).toContain("fixed inset-0 w-full h-full");
  });

  test("sends theme-change message on theme update", () => {
    const { container, rerender } = render(<Background theme="light" />);
    const iframe = container.querySelector("iframe") as HTMLIFrameElement;

    expect(iframe).not.toBeNull();
    if (iframe.contentWindow) {
      const postMessageMock = mock();
      iframe.contentWindow.postMessage = postMessageMock;

      // Update theme to dark
      rerender(<Background theme="dark" />);

      expect(postMessageMock).toHaveBeenCalledWith(
        { type: 'theme-change', theme: 'dark' },
        '*'
      );

      // Update theme back to light
      rerender(<Background theme="light" />);

      expect(postMessageMock).toHaveBeenCalledWith(
        { type: 'theme-change', theme: 'light' },
        '*'
      );
    } else {
      throw new Error("contentWindow is null");
    }
  });

  test("sends theme-change message on window resize and clears timeout", () => {
    const { container } = render(<Background theme="dark" />);
    const iframe = container.querySelector("iframe") as HTMLIFrameElement;

    if (iframe.contentWindow) {
      const postMessageMock = mock();
      iframe.contentWindow.postMessage = postMessageMock;

      let timerId = 0;
      const originalSetTimeout = global.setTimeout;
      const originalClearTimeout = global.clearTimeout;

      const pendingTimeouts = new Map<number, Function>();
      const clearedTimeouts = new Set<number>();

      global.setTimeout = ((fn: Function, ms: number) => {
        timerId++;
        pendingTimeouts.set(timerId, fn);
        return timerId;
      }) as any;

      global.clearTimeout = ((id: number) => {
        clearedTimeouts.add(id);
        pendingTimeouts.delete(id);
      }) as any;

      try {
        // Trigger multiple resize events to test debouncing logic
        act(() => {
          window.dispatchEvent(new Event('resize'));
        });
        const firstTimerId = timerId;

        act(() => {
          window.dispatchEvent(new Event('resize'));
        });

        // Assert that the first timer was cleared
        expect(clearedTimeouts.has(firstTimerId)).toBe(true);
        expect(pendingTimeouts.size).toBe(1);

        // Execute the last timer callback
        const lastTimerCallback = pendingTimeouts.get(timerId);
        if (lastTimerCallback) {
          lastTimerCallback();
        }

        expect(postMessageMock).toHaveBeenCalledWith(
          { type: 'theme-change', theme: 'dark' },
          '*'
        );
      } finally {
        global.setTimeout = originalSetTimeout;
        global.clearTimeout = originalClearTimeout;
      }
    } else {
      throw new Error("contentWindow is null");
    }
  });
});
