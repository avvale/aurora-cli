export class CommonDeletedAttachmentLibraryEvent
{
    constructor(
        public readonly id: string,
        public readonly filename: string,
        public readonly mimetype: string,
        public readonly extension: string,
        public readonly relativePathSegments: any,
        public readonly width: number,
        public readonly height: number,
        public readonly size: number,
        public readonly url: string,
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
