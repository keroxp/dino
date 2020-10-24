.PHONY: node/package.json
node/package.json:
	deno run \
		--allow-read \
		--allow-write\
		--allow-run \
		tools/npm.ts