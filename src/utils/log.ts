import { flattenToMergedRecord, getKeys } from "./objects";

export function debugLog(debug?: boolean, ...args: unknown[]) {
  if (debug) {
    console.debug("[debug]", ...args);
  }
}

export function flatten<T extends object>(item: T) {
  return Object.values(flattenToMergedRecord(item)).join(",");
}

export function csvLog<T extends object>(data: T | T[]) {
  const headers = getKeys(data instanceof Array ? data[0] : data);
  console.log(headers.join(","));
  if (Array.isArray(data)) {
    data.forEach((item) => console.log(flatten(item)));
  } else {
    console.log(flatten(data));
  }
}

export default {
  debug: debugLog,
  csv: csvLog,
};
