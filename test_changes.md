# Test Plan for Pomodoro Timer Changes

## 1. Background Color Auto-Adjustment
- [ ] Switch to Focus mode - should show red/pink background (#FFF5F5)
- [ ] Switch to Short Break mode - should show blue/green background (#F0FFF4)
- [ ] Switch to Long Break mode - should show light green background (#F0FFFE)
- [ ] Transitions should be smooth (0.5s ease-in-out)
- [ ] Works in both normal and fullscreen modes

## 2. Custom Time Functionality
- [ ] Open custom time input
- [ ] Set custom time (e.g., 30 minutes)
- [ ] Click Apply - should update focus timer to 30:00
- [ ] Switch to focus mode - should use custom time
- [ ] Start timer - should count down from custom time
- [ ] Create task with planned time - should use that time when starting task

## 3. Task Card Layout
- [ ] Collapsed state should show: [checkbox] [task name + time] [start button] [expand icon]
- [ ] Start button should always be visible (not hidden in collapsed state)
- [ ] Clicking start button should start the task timer
- [ ] Expanded state should show additional details (notes, delete button)
- [ ] Layout should work in both light and dark themes
- [ ] Should be responsive on different screen sizes
