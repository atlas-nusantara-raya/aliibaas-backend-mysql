import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    private readonly logger = new Logger('PrismaService');

    constructor() {
        super({
            log: ['error', 'warn'], // optional
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Database connection established.');
        } catch (error) {
            this.logger.error('Database connection failed during initialization!', error);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}