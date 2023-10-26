import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAttachmentsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            familyId?: string;
            sort?: number;
            alt: string;
            title: string;
            path: string;
            filename: string;
            url: string;
            mime: string;
            extension: string;
            size: number;
            width?: number;
            height?: number;
            libraryId?: string;
            libraryFilename: string;
            meta?: any;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
