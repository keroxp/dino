const s = Deno.statSync("node/dist/di.js");
if (s.size > 1024) {
  console.log("size over: di.js " + s.size);
  Deno.exit(1);
}
