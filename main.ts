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
// Revision (second write of this file): after copying, the program
// now reads the output back and compares it byte for byte with the
// source, exiting non-zero on any mismatch. A silent truncated or
// corrupted copy used to pass as a successful run; now it fails
// loudly instead of handing the gate a bad file.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { timingSafeEqual } from 'node:crypto';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const srcPath = new URL('./entry.png', import.meta.url);
const destPath = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, destPath);

// Verify the copy: the output must be byte-identical to entry.png.
// A mismatch (truncated write, disk error, wrong source) is a hard
// failure, not a quiet success.
const srcBytes = readFileSync(srcPath);
const destBytes = readFileSync(destPath);
if (
  srcBytes.length !== destBytes.length ||
  !timingSafeEqual(srcBytes, destBytes)
) {
  throw new Error(
    `entry.png copy mismatch: source ${srcBytes.length} bytes, ` +
      `output ${destBytes.length} bytes`,
  );
}
