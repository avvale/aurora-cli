/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData, CommonMockAttachmentLibraryRepository } from '@app/common/attachment-library';
import { CommonUpsertAttachmentLibraryService } from '@app/common/attachment-library/application/upsert/common-upsert-attachment-library.service';
import {
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentLibraryService', () =>

{
    let service: CommonUpsertAttachmentLibraryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpsertAttachmentLibraryService,
                CommonMockAttachmentLibraryRepository,
                {
                    provide : CommonIAttachmentLibraryRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpsertAttachmentLibraryService);
    });

    describe('main', () =>
    {
        test('CommonUpsertAttachmentLibraryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a attachmentLibrary and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonAttachmentLibraryId(commonMockAttachmentLibraryData[0].id),
                        filename: new CommonAttachmentLibraryFilename(commonMockAttachmentLibraryData[0].filename),
                        mimetype: new CommonAttachmentLibraryMimetype(commonMockAttachmentLibraryData[0].mimetype),
                        extension: new CommonAttachmentLibraryExtension(commonMockAttachmentLibraryData[0].extension),
                        relativePathSegments: new CommonAttachmentLibraryRelativePathSegments(commonMockAttachmentLibraryData[0].relativePathSegments),
                        width: new CommonAttachmentLibraryWidth(commonMockAttachmentLibraryData[0].width),
                        height: new CommonAttachmentLibraryHeight(commonMockAttachmentLibraryData[0].height),
                        size: new CommonAttachmentLibrarySize(commonMockAttachmentLibraryData[0].size),
                        url: new CommonAttachmentLibraryUrl(commonMockAttachmentLibraryData[0].url),
                        meta: new CommonAttachmentLibraryMeta(commonMockAttachmentLibraryData[0].meta),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
