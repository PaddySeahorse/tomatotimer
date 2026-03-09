#!/bin/bash
sed -i 's/inputs: any\[\]/inputs: unknown\[\]/g' src/lib/utils.test.ts
sed -i 's/input: any/input: unknown/g' src/lib/utils.test.ts
sed -i 's/function cn(...inputs: any\[\]) {/function cn(...inputs: unknown\[\]) {/g' src/lib/utils.test.ts
sed -i 's/const clsx = require("clsx").clsx;/import { clsx } from "clsx";/g' src/lib/utils.test.ts
sed -i 's/const twMerge = require("tailwind-merge").twMerge;/import { twMerge } from "tailwind-merge";/g' src/lib/utils.test.ts
