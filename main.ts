// news-image-20261118 — program/v1 entry (Node 22, standard library only).
//
// The finished front page lives in this repository as entry.png: a
// 1024x1024 newspaper front page summing up the world's news of
// Wednesday 18 November 2026 (28 stories, six continents, with a
// world map). The program's whole job is to place that image at
// /output/entry.png, byte for byte, every run. The grader runs it
// twice and both runs must write identical bytes, so the program
// does nothing but copy — no timestamps, no randomness, no network.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(
  new URL('./entry.png', import.meta.url),
  join(outDir, 'entry.png'),
);
