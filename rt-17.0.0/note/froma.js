import { Scheduler } from 'scheduler';

function highPriorityTask() {
  // Do high priority work
}

function lowPriorityTask() {
  // Do low priority work
}

// Schedule the high priority task
Scheduler.unstable_scheduleCallback(
  Scheduler.unstable_ImmediatePriority,
  highPriorityTask
);

// Schedule the low priority task
Scheduler.unstable_scheduleCallback(
  Scheduler.unstable_UserBlockingPriority,
  lowPriorityTask
);
