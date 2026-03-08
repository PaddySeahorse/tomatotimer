import { GlobalRegistrator } from '@happy-dom/global-registrator';
GlobalRegistrator.register();

import { renderHook, act } from '@testing-library/react';
import { expect, test, mock, beforeEach, afterEach } from "bun:test";
import { useIsMobile } from "../use-mobile";

let matchMediaMock: any;
let addEventListenerMock: any;
let removeEventListenerMock: any;

beforeEach(() => {
  addEventListenerMock = mock();
  removeEventListenerMock = mock();

  matchMediaMock = mock((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: addEventListenerMock,
    removeEventListener: removeEventListenerMock,
    dispatchEvent: mock(),
  }));

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  });

  // Default to desktop
  window.innerWidth = 1024;
});

afterEach(() => {
  mock.restore();
});

test("useIsMobile returns false initially or on desktop", () => {
  const { result } = renderHook(() => useIsMobile());

  // Since the effect runs synchronously in test render, it will immediately evaluate to false
  expect(result.current).toBe(false);
  expect(matchMediaMock).toHaveBeenCalledWith("(max-width: 767px)");
});

test("useIsMobile returns true on mobile screen", () => {
  window.innerWidth = 375;
  const { result } = renderHook(() => useIsMobile());

  expect(result.current).toBe(true);
});

test("useIsMobile updates state on resize event", () => {
  window.innerWidth = 1024;
  const { result } = renderHook(() => useIsMobile());

  expect(result.current).toBe(false);
  expect(addEventListenerMock).toHaveBeenCalled();

  // Get the registered onChange handler
  const onChangeHandler = addEventListenerMock.mock.calls[0][1];

  // Simulate resizing to mobile
  act(() => {
    window.innerWidth = 500;
    onChangeHandler();
  });

  expect(result.current).toBe(true);

  // Simulate resizing back to desktop
  act(() => {
    window.innerWidth = 1024;
    onChangeHandler();
  });

  expect(result.current).toBe(false);
});

test("useIsMobile cleans up event listener on unmount", () => {
  const { unmount } = renderHook(() => useIsMobile());

  expect(addEventListenerMock).toHaveBeenCalled();
  const onChangeHandler = addEventListenerMock.mock.calls[0][1];

  unmount();

  expect(removeEventListenerMock).toHaveBeenCalledWith("change", onChangeHandler);
});
