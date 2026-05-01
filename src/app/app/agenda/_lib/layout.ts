import type { DayAppt } from "../views/day-view";
import { SLOT_MINUTES, localTimeParts } from "./calendar";

export type LaidOut = {
  appt: DayAppt;
  lane: number;
  total: number;
};

export type HourBucket = {
  hour: number;
  mode: "lanes" | "stacked";
  totalLanes: number;
  items: Array<{ appt: DayAppt; lane: number; stackIndex: number }>;
};

export const STACK_THRESHOLD = 3;

function effectiveDuration(min: number) {
  return Math.max(SLOT_MINUTES, min);
}

export function computeHourBuckets(
  items: DayAppt[],
  timezone?: string,
): HourBucket[] {
  const byHour = new Map<number, DayAppt[]>();
  for (const a of items) {
    const { hour } = localTimeParts(a.scheduled_at, timezone);
    const arr = byHour.get(hour) ?? [];
    arr.push(a);
    byHour.set(hour, arr);
  }

  const result: HourBucket[] = [];
  for (const [hour, hourItems] of byHour.entries()) {
    const sorted = [...hourItems].sort((a, b) => {
      const sa = new Date(a.scheduled_at).getTime();
      const sb = new Date(b.scheduled_at).getTime();
      if (sa !== sb) return sa - sb;
      return b.duration_minutes - a.duration_minutes;
    });

    if (sorted.length >= STACK_THRESHOLD) {
      result.push({
        hour,
        mode: "stacked",
        totalLanes: 1,
        items: sorted.map((appt, i) => ({ appt, lane: 0, stackIndex: i })),
      });
      continue;
    }

    const lanes: number[] = [];
    const placed: Array<{ appt: DayAppt; lane: number }> = [];
    for (const a of sorted) {
      const start = new Date(a.scheduled_at).getTime();
      const end = start + effectiveDuration(a.duration_minutes) * 60_000;
      let lane = lanes.findIndex((l) => l <= start);
      if (lane === -1) {
        lane = lanes.length;
        lanes.push(end);
      } else {
        lanes[lane] = end;
      }
      placed.push({ appt: a, lane });
    }

    result.push({
      hour,
      mode: "lanes",
      totalLanes: lanes.length || 1,
      items: placed.map((p, i) => ({
        appt: p.appt,
        lane: p.lane,
        stackIndex: i,
      })),
    });
  }

  return result.sort((a, b) => a.hour - b.hour);
}

export function layoutOverlaps(items: DayAppt[]): LaidOut[] {
  const sorted = [...items].sort((a, b) => {
    const sa = new Date(a.scheduled_at).getTime();
    const sb = new Date(b.scheduled_at).getTime();
    if (sa !== sb) return sa - sb;
    return b.duration_minutes - a.duration_minutes;
  });

  const result: LaidOut[] = [];
  let cluster: { appt: DayAppt; lane: number }[] = [];
  let clusterEnd = -Infinity;
  let lanes: number[] = [];

  const flushCluster = () => {
    const total = lanes.length || 1;
    for (const c of cluster) {
      result.push({ appt: c.appt, lane: c.lane, total });
    }
    cluster = [];
    lanes = [];
    clusterEnd = -Infinity;
  };

  for (const a of sorted) {
    const start = new Date(a.scheduled_at).getTime();
    const end = start + a.duration_minutes * 60_000;

    if (start >= clusterEnd) flushCluster();

    let lane = lanes.findIndex((laneEnd) => laneEnd <= start);
    if (lane === -1) {
      lane = lanes.length;
      lanes.push(end);
    } else {
      lanes[lane] = end;
    }

    cluster.push({ appt: a, lane });
    clusterEnd = Math.max(clusterEnd, end);
  }
  flushCluster();

  return result;
}
