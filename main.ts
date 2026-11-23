import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const joke =
  "I used to explain my code to a rubber duck to find bugs. " +
  "Now the AI writes the code and I'm the duck.";

// Validate: 1-280 Unicode code points (spread operator iterates code points,
// unlike .length which counts UTF-16 code units)
const codePoints = [...joke].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`Joke is ${codePoints} code points, outside the 1-280 range.`);
}

// In the grader sandbox the output directory is always /output.
// Locally, the harness sets MAKEFUN_OUTPUT_DIR so the program can write
// to a writable path without needing root access (e.g. MAKEFUN_OUTPUT_DIR=out).
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, joke, "utf8");

console.log(`OK: wrote ${codePoints} code points to ${outFile}`);
console.log(`Content: ${joke}`);
