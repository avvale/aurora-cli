import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAttachmentLibraryCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            path: string;
            filename: string;
            url: string;
            mime: string;
            extension: string;
            size: number;
            width?: number;
            height?: number;
            meta?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
