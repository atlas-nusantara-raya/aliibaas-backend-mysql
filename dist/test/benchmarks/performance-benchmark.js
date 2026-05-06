"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const CACHE_DIR = path.join(process.cwd(), 'storage', 'cache', 'benchmark_test');
const ITERATIONS = 1000;
function ensureCacheDir() {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
}
function cleanCacheDir() {
    if (fs.existsSync(CACHE_DIR)) {
        const files = fs.readdirSync(CACHE_DIR);
        for (const file of files) {
            fs.unlinkSync(path.join(CACHE_DIR, file));
        }
    }
}
async function runBenchmark() {
    console.log('🚀 Starting Allibaas Performance Benchmark...');
    console.log('--------------------------------------------');
    ensureCacheDir();
    const results = [];
    const startHash = perf_hooks_1.performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        const data = `origin-123-dest-456-weight-1000-jne-reg-${i}`;
        crypto.createHash('md5').update(data).digest('hex');
    }
    const endHash = perf_hooks_1.performance.now();
    results.push({
        'Operation': 'MD5 Cache Key Generation',
        'Time (ms)': (endHash - startHash).toFixed(4),
        'Avg (ms/op)': ((endHash - startHash) / ITERATIONS).toFixed(6),
        'Throughput (ops/s)': (ITERATIONS / ((endHash - startHash) / 1000)).toFixed(0)
    });
    const startWrite = perf_hooks_1.performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        const filePath = path.join(CACHE_DIR, `test_${i}.json`);
        fs.writeFileSync(filePath, JSON.stringify({ id: i, data: 'some location data value' }));
    }
    const endWrite = perf_hooks_1.performance.now();
    results.push({
        'Operation': 'File Cache Write (JSON)',
        'Time (ms)': (endWrite - startWrite).toFixed(4),
        'Avg (ms/op)': ((endWrite - startWrite) / ITERATIONS).toFixed(6),
        'Throughput (ops/s)': (ITERATIONS / ((endWrite - startWrite) / 1000)).toFixed(0)
    });
    const startRead = perf_hooks_1.performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        const filePath = path.join(CACHE_DIR, `test_${i}.json`);
        JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    const endRead = perf_hooks_1.performance.now();
    results.push({
        'Operation': 'File Cache Read (JSON Hit)',
        'Time (ms)': (endRead - startRead).toFixed(4),
        'Avg (ms/op)': ((endRead - startRead) / ITERATIONS).toFixed(6),
        'Throughput (ops/s)': (ITERATIONS / ((endRead - startRead) / 1000)).toFixed(0)
    });
    const startStat = perf_hooks_1.performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        const filePath = path.join(CACHE_DIR, `test_${i}.json`);
        const stats = fs.statSync(filePath);
        const mtime = new Date(stats.mtime).getTime();
        const valid = (Date.now() - mtime) < (7 * 24 * 60 * 60 * 1000);
    }
    const endStat = perf_hooks_1.performance.now();
    results.push({
        'Operation': 'TTL Validation (fs.stat)',
        'Time (ms)': (endStat - startStat).toFixed(4),
        'Avg (ms/op)': ((endStat - startStat) / ITERATIONS).toFixed(6),
        'Throughput (ops/s)': (ITERATIONS / ((endStat - startStat) / 1000)).toFixed(0)
    });
    console.table(results);
    console.log('--------------------------------------------');
    console.log(`✅ Benchmark completed for ${ITERATIONS} iterations.`);
    cleanCacheDir();
}
runBenchmark().catch(console.error);
//# sourceMappingURL=performance-benchmark.js.map