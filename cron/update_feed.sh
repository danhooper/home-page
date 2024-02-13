#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR
npx ts-node src/index.ts
npx wrangler r2 object put home-page/feeds.json --file=feeds.json
