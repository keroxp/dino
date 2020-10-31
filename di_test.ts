import { DI } from "./di.ts";
import {
  assertEquals,
  assertThrows,
} from "./vendor/https/deno.land/std/testing/asserts.ts";

const { test } = Deno;
interface Values {
  value: number;
  str: string;
}

test("basic", () => {
  const di = new DI<Values>();
  assertEquals(di.has("value"), false);
  di.set("value", 1);
  assertEquals(di.has("value"), true);
  assertThrows(
    () => {
      di.get("str");
    },
    Error,
    "str is not registered",
  );
  const n: number = di.get("value");
  assertEquals(n, 1);
  di.reset();
  assertThrows(
    () => {
      di.get("value");
    },
    Error,
    "value is not registered",
  );
  di.set("str", "str");
  di.unset("str");
  assertEquals(di.has("str"), false);
});

test("set undefined", () => {
  const di = new DI<{
    opts: boolean | undefined | null;
  }>();
  assertEquals(di.has("opts"), false);
  di.set("opts", undefined);
  assertEquals(di.has("opts"), true);
  di.set("opts", null);
  assertEquals(di.has("opts"), true);
});

test("lazy", () => {
  const di = new DI<{
    date: Date;
  }>();
  const date = new Date();
  di.setLazy("date", () => date);
  assertEquals(di.has("date"), false);
  assertEquals(di.get("date"), date);
  assertEquals(di.get("date"), date);
});
