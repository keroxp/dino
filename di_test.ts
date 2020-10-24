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
  assertEquals(di.get("value"), 1);
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

test("domain", () => {
  const di = new DI<Values>();
  di.set("value", 1);
  const domain = di.domain();
  assertEquals(domain.get("value"), 1);
  domain.set("value", 2);
  assertEquals(domain.get("value"), 2);
  assertEquals(di.get("value"), 1);
  domain.reset();
  assertEquals(di.get("value"), 1);
});
