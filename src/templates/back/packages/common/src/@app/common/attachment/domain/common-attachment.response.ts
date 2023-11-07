import { CommonAttachmentFamilyResponse } from '@app/common/attachment-family';
import { CommonAttachmentLibraryResponse } from '@app/common/attachment-library';

export class CommonAttachmentResponse
{
    constructor(
        public readonly id: string,
        public readonly familyId: string,
        public readonly attachableId: string,
        public readonly sort: number,
        public readonly alt: string,
        public readonly title: string,
        public readonly originFilename: string,
        public readonly filename: string,
        public readonly mimetype: string,
        public readonly extension: string,
        public readonly relativePathSegments: any,
        public readonly width: number,
        public readonly height: number,
        public readonly size: number,
        public readonly url: string,
        public readonly isCropable: boolean,
        public readonly libraryId: string,
        public readonly libraryFilename: string,
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly family: CommonAttachmentFamilyResponse,
        public readonly library: CommonAttachmentLibraryResponse,
    ) {}
}
