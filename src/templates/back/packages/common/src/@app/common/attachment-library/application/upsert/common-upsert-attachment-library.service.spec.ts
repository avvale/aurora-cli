/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData, CommonMockAttachmentLibraryRepository } from '@app/common/attachment-library';
import { CommonUpsertAttachmentLibraryService } from '@app/common/attachment-library/application/upsert/common-upsert-attachment-library.service';
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
                ),
            )
                .toBe(undefined);
        });
    });
});
