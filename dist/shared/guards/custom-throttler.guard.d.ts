import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';
export declare class CustomThrottlerGuard extends ThrottlerGuard {
    protected handleRequest(requestProps: ThrottlerRequest): Promise<boolean>;
}
