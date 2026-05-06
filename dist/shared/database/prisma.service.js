"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function (o) {
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
//const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
//const mariadb = __importStar(require("mariadb"));
let PrismaService = class PrismaService extends client_1.PrismaClient {
    logger = new common_1.Logger('PrismaService');
    pool = null;
    constructor() {
        const connectionString = process.env.DATABASE_URL || '';
        const isHostinger = process.platform === 'linux';
        //  if (isHostinger) {
        // console.log('\x1b[32m[SYSTEM] ENVIRONMENT: HOSTINGER (LINUX) - ACTIVATING MARIA DB ADAPTER\x1b[0m');
        // let host = '127.0.0.1';
        // let port = 3306;
        // let user = '';
        // let password = '';
        // let database = '';
        // try {
        //     const url = new URL(connectionString);
        //     host = url.hostname;
        //     port = parseInt(url.port) || 3306;
        //     user = url.username;
        //     password = decodeURIComponent(url.password);
        //     database = url.pathname.substring(1);
        //     console.info(host, "-", port, "-", user, "-", password, "-", database)
        //     if (host !== 'localhost' && host !== '127.0.0.1' && /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        //         console.warn(`[SYSTEM] DETECTED EXTERNAL IP (${host}) ON HOSTINGER. Recommended to use 127.0.0.1 for better stability.`);
        //     }
        // }
        // catch (e) {
        //     console.error('[SYSTEM] Failed to parse DATABASE_URL', e.message);
        // }
        // const pool = mariadb.createPool({
        //     host: host,
        //     port: port,
        //     user: user,
        //     password: password,
        //     database: database,
        //     connectionLimit: 5,
        //     connectTimeout: 60000,
        // });
        // const adapter = new adapter_mariadb_1.PrismaMariaDb(pool);
        // super({ adapter });
        // this.pool = pool;
        //  }
        //   else {
        //   console.log('\x1b[33m[SYSTEM] ENVIRONMENT: LOCAL (WINDOWS) - USING STANDARD ENGINE\x1b[0m');
        super();
        //  }
    }
    async onModuleInit() {
        try {
            await Promise.race([
                this.$connect(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timeout during $connect()')), 30000))
            ]);
            this.logger.log('Database connection established.');
        }
        catch (error) {
            this.logger.error('Database connection failed during initialization!', error);
        }
    }
    async onModuleDestroy() {
        try {
            await this.$disconnect();
            if (this.pool) {
                await this.pool.end();
            }
        }
        catch (e) { }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map