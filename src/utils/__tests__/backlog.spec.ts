import { describe, it, expect } from "vitest";
import { isBacklogError } from "../backlog";

describe("backlog.ts", () => {
  describe("isBacklogError", () => {
    it("should return true for a valid BacklogApiError-like object", () => {
      const errorLike = {
        _name: "BacklogApiError",
        _status: 404,
        _url: "https://example.com/api",
        _body: {
          errors: [{ message: "User not found", code: 6, moreInfo: "" }],
        },
      };

      expect(isBacklogError(errorLike)).toBe(true);
    });

    it("should return false for null", () => {
      expect(isBacklogError(null)).toBe(false);
    });

    it("should return false for non-object types", () => {
      expect(isBacklogError("error")).toBe(false);
      expect(isBacklogError(123)).toBe(false);
      expect(isBacklogError(true)).toBe(false);
    });

    it("should return false for object missing required properties", () => {
      expect(isBacklogError({})).toBe(false);
      expect(isBacklogError({ name: "BacklogApiError" })).toBe(false);
      expect(isBacklogError({ status: 404 })).toBe(false);
      expect(isBacklogError({ status: "not a number" })).toBe(false);
    });

    it("should return false if body.errors is missing", () => {
      const badError = {
        _name: "BacklogApiError",
        _status: 404,
        _url: "https://example.com/api",
        _body: {}, // missing errors
      };
      expect(isBacklogError(badError)).toBe(false);
    });
  });
});
