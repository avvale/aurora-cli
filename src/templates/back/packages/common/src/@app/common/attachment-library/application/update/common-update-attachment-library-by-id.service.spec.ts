/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData, CommonMockAttachmentLibraryRepository } from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdService } from '@app/common/attachment-library/application/update/common-update-attachment-library-by-id.service';
import {
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMime,
    CommonAttachmentLibraryName,
    CommonAttachmentLibraryPath,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibraryByIdService', () =>
{
    let service: CommonUpdateAttachmentLibraryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateAttachmentLibraryByIdService,
                CommonMockAttachmentLibraryRepository,
                {
                    provide : CommonIAttachmentLibraryRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateAttachmentLibraryByIdService);
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentLibraryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a attachmentLibrary and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonAttachmentLibraryId(commonMockAttachmentLibraryData[0].id),
                        name: new CommonAttachmentLibraryName(commonMockAttachmentLibraryData[0].name),
                        path: new CommonAttachmentLibraryPath(commonMockAttachmentLibraryData[0].path),
                        filename: new CommonAttachmentLibraryFilename(commonMockAttachmentLibraryData[0].filename),
                        url: new CommonAttachmentLibraryUrl(commonMockAttachmentLibraryData[0].url),
                        mime: new CommonAttachmentLibraryMime(commonMockAttachmentLibraryData[0].mime),
                        extension: new CommonAttachmentLibraryExtension(commonMockAttachmentLibraryData[0].extension),
                        size: new CommonAttachmentLibrarySize(commonMockAttachmentLibraryData[0].size),
                        width: new CommonAttachmentLibraryWidth(commonMockAttachmentLibraryData[0].width),
                        height: new CommonAttachmentLibraryHeight(commonMockAttachmentLibraryData[0].height),
                        meta: new CommonAttachmentLibraryMeta(commonMockAttachmentLibraryData[0].meta),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
