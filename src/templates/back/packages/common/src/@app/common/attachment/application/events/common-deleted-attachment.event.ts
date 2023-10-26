export class CommonDeletedAttachmentEvent
{
    constructor(
        public readonly id: string,
        public readonly familyId: string,
        public readonly sort: number,
        public readonly alt: string,
        public readonly title: string,
        public readonly path: string,
        public readonly filename: string,
        public readonly url: string,
        public readonly mime: string,
        public readonly extension: string,
        public readonly size: number,
        public readonly width: number,
        public readonly height: number,
        public readonly libraryId: string,
        public readonly libraryFilename: string,
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
