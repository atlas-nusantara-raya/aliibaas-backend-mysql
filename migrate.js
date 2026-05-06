process.env.UV_THREADPOOL_SIZE = "4";
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('--- MANUAL MIGRATION TOOL ---');
if (fs.existsSync('.env')) {
    const dotenv = require('dotenv');
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    for (const k in envConfig) process.env[k] = envConfig[k];
}

try {
    const nodeBinary = process.execPath;
    const prismaCLI = path.join(__dirname, 'node_modules', 'prisma', 'build', 'index.js');
    console.log('📦 Running Migration Deploy...');
    execSync(`"${nodeBinary}" "${prismaCLI}" migrate deploy`, { 
        stdio: 'inherit',
        env: process.env 
    });
    console.log('✅ Migration Finished Successfully.');
} catch (e) {
    console.error('❌ Migration Failed:', e.message);
}