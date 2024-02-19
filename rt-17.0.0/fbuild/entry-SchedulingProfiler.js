import { enableSchedulingProfiler } from 'shared/ReactFeatureFlags';
import ReactVersion from 'shared/ReactVersion';
import getComponentName from 'shared/getComponentName';

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
/**
 * If performance exists and supports the subset of the User Timing API that we
 * require.
 */

const supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function';

function formatLanes(laneOrLanes) {
  return laneOrLanes.toString();
} // Create a mark on React initialization


if (enableSchedulingProfiler) {
  if (supportsUserTiming) {
    performance.mark(`--react-init-${ReactVersion}`);
  }
}

function markCommitStarted(lanes) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark(`--commit-start-${formatLanes(lanes)}`);
    }
  }
}
function markCommitStopped() {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark('--commit-stop');
    }
  }
}
const PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map; // $FlowFixMe: Flow cannot handle polymorphic WeakMaps

const wakeableIDs = new PossiblyWeakMap();
let wakeableID = 0;

function getWakeableID(wakeable) {
  if (!wakeableIDs.has(wakeable)) {
    wakeableIDs.set(wakeable, wakeableID++);
  }

  return wakeableIDs.get(wakeable);
}

function markComponentSuspended(fiber, wakeable) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      const id = getWakeableID(wakeable);
      const componentName = getComponentName(fiber.type) || 'Unknown'; // TODO Add component stack id

      performance.mark(`--suspense-suspend-${id}-${componentName}`);
      wakeable.then(() => performance.mark(`--suspense-resolved-${id}-${componentName}`), () => performance.mark(`--suspense-rejected-${id}-${componentName}`));
    }
  }
}
function markLayoutEffectsStarted(lanes) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark(`--layout-effects-start-${formatLanes(lanes)}`);
    }
  }
}
function markLayoutEffectsStopped() {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark('--layout-effects-stop');
    }
  }
}
function markPassiveEffectsStarted(lanes) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark(`--passive-effects-start-${formatLanes(lanes)}`);
    }
  }
}
function markPassiveEffectsStopped() {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark('--passive-effects-stop');
    }
  }
}
function markRenderStarted(lanes) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark(`--render-start-${formatLanes(lanes)}`);
    }
  }
}
function markRenderYielded() {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark('--render-yield');
    }
  }
}
function markRenderStopped() {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark('--render-stop');
    }
  }
}
function markRenderScheduled(lane) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      performance.mark(`--schedule-render-${formatLanes(lane)}`);
    }
  }
}
function markForceUpdateScheduled(fiber, lane) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      const componentName = getComponentName(fiber.type) || 'Unknown'; // TODO Add component stack id

      performance.mark(`--schedule-forced-update-${formatLanes(lane)}-${componentName}`);
    }
  }
}
function markStateUpdateScheduled(fiber, lane) {
  if (enableSchedulingProfiler) {
    if (supportsUserTiming) {
      const componentName = getComponentName(fiber.type) || 'Unknown'; // TODO Add component stack id

      performance.mark(`--schedule-state-update-${formatLanes(lane)}-${componentName}`);
    }
  }
}

export { markCommitStarted, markCommitStopped, markComponentSuspended, markForceUpdateScheduled, markLayoutEffectsStarted, markLayoutEffectsStopped, markPassiveEffectsStarted, markPassiveEffectsStopped, markRenderScheduled, markRenderStarted, markRenderStopped, markRenderYielded, markStateUpdateScheduled };
