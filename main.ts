import { writeFileSync, mkdirSync } from "node:fs";

// Absurd clause for make.fun's "The Absurd Clause Contest".
// Deadpan legal boilerplate that quietly turns absurd: the user agrees
// their shadow may be sublet to third parties, but only on overcast days.
const CLAUSE =
  "By using this service, you agree that your shadow may be sublet to third parties on overcast days.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the clause meets the gate before writing it.
const chars = [...CLAUSE].length;
if (chars < 1 || chars > 200 || CLAUSE.trim().length === 0) {
  throw new Error(`clause is ${chars} characters, outside the 1-200 gate`);
}

// The brief demands exactly one sentence: a fragment, a second sentence
// or a line break would read as two clauses, so count the sentence
// terminators and require the clause to end on a single period.
const terminators = CLAUSE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !CLAUSE.endsWith(".") || CLAUSE.includes("\n")) {
  throw new Error("clause must be exactly one sentence on one line");
}

// An em dash or en dash would break the clean legal-boilerplate register
// the judge weighs, so refuse either.
if (CLAUSE.includes("\u2014") || CLAUSE.includes("\u2013")) {
  throw new Error("clause must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, CLAUSE, "utf8");
