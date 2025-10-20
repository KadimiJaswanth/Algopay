#!/usr/bin/env node
/*
  generate_commits.js

  Usage: node scripts/generate_commits.js --count 5 --prefix Widget --branch feature/ui-enhancements/poc-1

  This script creates `count` new React components under client/components/ui/ named
  `${prefix}${i}.tsx`, commits each file in its own commit with a descriptive message,
  and runs `pnpm -s exec -- tsc --noEmit` after each commit. If tsc fails the script will
  abort to avoid leaving the repo in a broken state.

  The script uses the system git CLI; it does not push to remote.
*/

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { count: 5, prefix: 'Widget', branch: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--count') out.count = Number(args[++i]);
    if (a === '--prefix') out.prefix = args[++i];
    if (a === '--branch') out.branch = args[++i];
  }
  return out;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeComponent(dir, name, idx) {
  const file = path.join(dir, `${name}.tsx`);
  const content = `import React from 'react';
import clsx from 'clsx';

/* ${name}
   Auto-generated UI widget for incremental commits.
   Purpose: Demonstrate a small reusable component with modern React hooks and Tailwind usage.
*/

type Props = {
  title?: string;
  subtitle?: string;
};

export default function ${name}({ title = '${name} Title', subtitle = 'A small auto-generated widget' }: Props) {
  // local state for demonstration — shows interactivity
  const [count, setCount] = React.useState(0);

  return (
    <div className={clsx('rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-800')}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1 text-white text-sm hover:bg-indigo-500 focus:outline-none"
          >
            Click
          </button>
          <span className="text-sm">{count}</span>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        This small component demonstrates state, styling, and accessibility patterns used across the app.
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(file, content, 'utf8');
  return file;
}

function git(cmd) {
  return execSync(`git ${cmd}`, { stdio: 'pipe' }).toString('utf8').trim();
}

function runTsc() {
  try {
    execSync('pnpm -s exec -- tsc --noEmit --pretty false', { stdio: 'inherit' });
    return true;
  } catch (e) {
    return false;
  }
}

function findStartIndex(dir, prefix) {
  // scan dir for files like prefixNNN.tsx and return next index to use
  if (!fs.existsSync(dir)) return 1;
  const files = fs.readdirSync(dir);
  const re = new RegExp('^' + prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '(\\d{3})\\.tsx$');
  let max = 0;
  for (const f of files) {
    const m = f.match(re);
    if (m) {
      const n = Number(m[1]);
      if (!Number.isNaN(n) && n > max) max = n;
    }
  }
  return max + 1;
}

function main() {
  const { count, prefix, branch } = parseArgs();
  const uiDir = path.join(process.cwd(), 'client', 'components', 'ui');
  ensureDir(uiDir);

  // determine starting index so we don't overwrite or duplicate existing files
  let startIndex = 1;
  try {
    startIndex = findStartIndex(uiDir, prefix);
  } catch (e) {
    startIndex = 1;
  }

  if (branch) {
    console.log(`Creating and switching to branch ${branch}`);
    // if branch exists, checkout; otherwise create it
    try {
      execSync(`git branch --list ${branch}`, { stdio: 'pipe' });
      const out = execSync(`git branch --list ${branch}`).toString('utf8').trim();
      if (out) {
        execSync(`git checkout ${branch}`, { stdio: 'inherit' });
      } else {
        execSync(`git checkout -b ${branch}`, { stdio: 'inherit' });
      }
    } catch (e) {
      // fallback: try create
      execSync(`git checkout -b ${branch}`, { stdio: 'inherit' });
    }
  }

  for (let k = 0; k < count; k++) {
    const i = startIndex + k;
    const name = `${prefix}${String(i).padStart(3, '0')}`;
    const file = writeComponent(uiDir, name, i);
    console.log(`Wrote ${file}`);

    // stage & commit
  // quote the file path to handle spaces on Windows
  execSync(`git add "${file}"`, { stdio: 'inherit' });
  const msg = `feat(ui): add ${name} — small interactive widget (#${i})`;
  // use JSON.stringify to safely quote the commit message
  execSync('git commit -m ' + JSON.stringify(msg), { stdio: 'inherit' });
    console.log(`Committed: ${msg}`);

    // run typecheck and abort on failure
    console.log('Running TypeScript check...');
    const ok = runTsc();
    if (!ok) {
      console.error('TypeScript errors detected — aborting further commits');
      process.exit(1);
    }
  }

  console.log('Done creating commits. No push was performed.');
}

main();
