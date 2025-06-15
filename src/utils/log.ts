function debugLog(debug?: boolean, ...args: any[]) {
  if (debug) {
    console.debug("[debug]", ...args);
  }
}

export default {
  debug: debugLog,
};
