import { describe, it, expect } from "vitest";
import yargs from "yargs";
import { withUserIdOption, checkUserIdOption } from "../userId";

describe("withUserIdOption", () => {
  const parser = withUserIdOption(yargs());

  it("should parse userId option as a number", async () => {
    const result = await parser.parse(["--userId", "42"]);
    expect(result.userId).toBe(42);
  });
});

describe("checkuserIdOption", () => {
  it("accepts a positive integer userId", () => {
    expect(checkUserIdOption({ userId: 123 })).toBe(true);
  });

  it("throws an error if userId is undefined", () => {
    expect(() => checkUserIdOption({})).toThrow(
      "ユーザーIDを指定してください。"
    );
  });

  it("throws an error if userId is zero", () => {
    expect(() => checkUserIdOption({ userId: 0 })).toThrow(
      "ユーザーIDは正の整数でなければなりません。"
    );
  });

  it("throws an error if userId is negative", () => {
    expect(() => checkUserIdOption({ userId: -1 })).toThrow(
      "ユーザーIDは正の整数でなければなりません。"
    );
  });

  it("throws an error if userId is not a number", () => {
    expect(() =>
      checkUserIdOption({ userId: "abc" as unknown as number })
    ).toThrow("ユーザーIDは正の整数でなければなりません。");
  });

  it("throws an error if userId is NaN", () => {
    expect(() => checkUserIdOption({ userId: NaN })).toThrow(
      "ユーザーIDは正の整数でなければなりません。"
    );
  });

  it("throws an error if userId is Infinity", () => {
    expect(() => checkUserIdOption({ userId: Infinity })).toThrow(
      "ユーザーIDは正の整数でなければなりません。"
    );
  });

  it("throws an error if userId is a float", () => {
    expect(() => checkUserIdOption({ userId: 1.5 })).toThrow(
      "ユーザーIDは正の整数でなければなりません。"
    );
  });
});
