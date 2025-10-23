import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const backendSwagger = path.resolve('../backend/swagger.json');
const output = path.resolve('./types/api-types.ts');

if (!fs.existsSync(backendSwagger)) {
  console.error('❌ swagger.json not found! Make sure backend has been started once.');
  process.exit(1);
}

console.log('🚀 Generating frontend types from backend swagger...');
execSync(`npx openapi-typescript ${backendSwagger} --output ${output}`, { stdio: 'inherit' });
console.log('✅ Types generated at', output);
