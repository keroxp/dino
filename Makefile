.PHONY: node/package.json
node/package.json:
	deno run \
		--allow-read \
		--allow-write\
		--allow-run \
		tools/npm.ts
fmt:
	deno fmt --ignore=node --unstable
fmtcheck:
	deno fmt --ignore=node --unstable --check