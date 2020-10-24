const decoder = new TextDecoder();
const encoder = new TextEncoder();

function makePackageJson() {
  const tsver = Deno.version.typescript;
  const json = JSON.parse(decoder.decode(Deno.readFileSync("package.json")));
  json["devDependencies"]["typescript"] = "^" + tsver;
  Deno.writeFileSync(
    "package.json",
    encoder.encode(JSON.stringify(json, undefined, "  ")),
  );
}

async function yarnInstall() {
  await Deno.run({ cmd: ["yarn", "install"] }).status();
}

async function tsc() {
  await Deno.run(
    {
      cmd: [
        "yarn",
        "tsc",
        "../di.ts",
        "-d",
        "--outDir",
        "dist",
        "--lib",
        "es2020",
      ],
    },
  ).status();
}

if (import.meta.main) {
  Deno.chdir("node");
  await makePackageJson();
  await yarnInstall();
  await tsc();
}
