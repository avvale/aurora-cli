import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAttachmentLibrariesCommand
{
    constructor(
        public readonly payload: {
            id: string;
            filename: string;
            mimetype: string;
            extension: string;
            relativePathSegments: any;
            width: number;
            height: number;
            size: number;
            url: string;
            meta?: any;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
