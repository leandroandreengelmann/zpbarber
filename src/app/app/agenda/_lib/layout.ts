import type { DayAppt } from "../views/day-view";

export type LaidOut = {
  appt: DayAppt;
  lane: number;
  total: number;
};

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
