import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function config(entry = []) {
  return [...entry, resolve(__dirname, 'register')];
}

export default { managerEntries: config };
