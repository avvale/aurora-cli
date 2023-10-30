import { CQMetadata } from '@aurorajs.dev/core';

export class CommonUpsertAttachmentLibraryCommand
{
    constructor(
        public readonly payload: {
            id: string;
            filename?: string;
            mimetype?: string;
            extension?: string;
            relativePathSegments?: any;
            width?: number;
            height?: number;
            size?: number;
            url?: string;
            isCropable?: boolean;
            meta?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
