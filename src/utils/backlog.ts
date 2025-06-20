export function isBacklogError(err: unknown): err is {
  _name: string;
  _status: number;
  _url: string;
  _body?: { errors: { code: number; message: string; moreInfo: string }[] };
} {
  return (
    typeof err === "object" &&
    err !== null &&
    "_name" in err &&
    "_status" in err &&
    "_body" in err &&
    "errors" in (err as any)._body
  );
}
