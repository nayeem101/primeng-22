/**
 * Vitest 4.1.x on Windows fails when the process cwd uses a lowercase drive
 * letter ("Vitest failed to find the runner"). See vitest#10692.
 * Normalize the drive letter, then hand off to `ng test`.
 */
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { chdir, cwd, exit, platform } from 'node:process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

if (platform === 'win32') {
  const normalized = root.replace(/^([a-z]):/, (_, letter) => `${letter.toUpperCase()}:`);
  chdir(normalized);
} else {
  chdir(root);
}

const ngCli = resolve(root, 'node_modules/@angular/cli/bin/ng.js');
const result = spawnSync(process.execPath, [ngCli, 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  cwd: cwd(),
  env: process.env,
});

exit(result.status ?? 1);
