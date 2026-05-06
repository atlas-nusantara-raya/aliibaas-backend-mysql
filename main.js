const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--------------------------------------------------');
console.log('🚀 Starting Allibaas NestJS Application...');
console.log('🕒 Time:', new Date().toISOString());

// 1. Load .env manually without external modules
if (fs.existsSync('.env')) {
    const envFile = fs.readFileSync('.env', 'utf8');
    envFile.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return; 
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let val = match[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.substring(1, val.length - 1);
            }
            process.env[key] = val;
        }
    });
    console.log('✅ Environment variables loaded from .env');
}

// 2. Automatic NPM Install if node_modules is missing
/*
const nodeModulesPath = path.join(__dirname, 'node_modules');
const nestjsPath = path.join(nodeModulesPath, '@nestjs');
if (!fs.existsSync(nodeModulesPath) || !fs.existsSync(nestjsPath)) {
    console.log('📦 node_modules missing or incomplete. Initializing npm install...');
    try {
        // Use --no-audit and --no-fund to speed up and reduce memory usage on shared hosting
        execSync('npm install --production --no-audit --no-fund', { stdio: 'inherit' });
        console.log('✅ npm install completed successfully.');
    } catch (e) {
        console.error('❌ npm install failed. The app may fail to start:', e.message);
    }
}
*/
// 3. Sync Prisma Client from pre-generated bundle
try {
    const sourceDir = path.join(__dirname, 'prisma', 'pre-generated-client');
    const targetDir = path.join(__dirname, 'node_modules');
    const prismaDest = path.join(targetDir, '.prisma', 'client');
    
    if (!fs.existsSync(prismaDest)) {
        console.log('🔄 Syncing Prisma Client (Smart Bridge)...');
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        
        fs.cpSync(path.join(sourceDir, '.prisma'), path.join(targetDir, '.prisma'), { recursive: true });
        fs.cpSync(path.join(sourceDir, '@prisma/client'), path.join(targetDir, '@prisma/client'), { recursive: true });
        console.log('✅ Prisma Client synchronized.');
    } else {
        console.log('📦 Prisma Client already exists in node_modules.');
    }
} catch (e) {
    console.error('⚠️ Prisma Sync failed:', e.message);
}

// 4. Initialize Prisma as a Singleton
console.log('🔗 Emulating Prisma Singleton...');
const { PrismaClient } = require('@prisma/client');
if (!global.prisma) {
    global.prisma = new PrismaClient();
}

console.log('⚡ Bootstrapping NestJS...');
require('./dist/main.js');