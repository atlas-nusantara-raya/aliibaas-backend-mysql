import { StreamableFile } from '@nestjs/common';
export declare class ImageController {
    getFile(filename: string, res: any): Promise<StreamableFile>;
}
