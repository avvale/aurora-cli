import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAttachmentCommand
{
    constructor(
        public readonly payload: {
            id: string;
            familyId?: string;
            sort?: number;
            alt?: string;
            title?: string;
            filename: string;
            mimetype: string;
            extension: string;
            relativePathSegments: any;
            width?: number;
            height?: number;
            size: number;
            url: string;
            isCropable: boolean;
            libraryId?: string;
            libraryFilename?: string;
            meta?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
