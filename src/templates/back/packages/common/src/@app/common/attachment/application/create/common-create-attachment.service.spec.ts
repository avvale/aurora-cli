/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentRepository, commonMockAttachmentData, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonCreateAttachmentService } from '@app/common/attachment/application/create/common-create-attachment.service';
import {
    CommonAttachmentAlt,
    CommonAttachmentExtension,
    CommonAttachmentFamilyId,
    CommonAttachmentFilename,
    CommonAttachmentHeight,
    CommonAttachmentId,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryId,
    CommonAttachmentMeta,
    CommonAttachmentMime,
    CommonAttachmentPath,
    CommonAttachmentSize,
    CommonAttachmentSort,
    CommonAttachmentTitle,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentService', () =>

{
    let service: CommonCreateAttachmentService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAttachmentService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAttachmentService);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a attachment and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonAttachmentId(commonMockAttachmentData[0].id),
                        familyId: new CommonAttachmentFamilyId(commonMockAttachmentData[0].familyId),
                        sort: new CommonAttachmentSort(commonMockAttachmentData[0].sort),
                        alt: new CommonAttachmentAlt(commonMockAttachmentData[0].alt),
                        title: new CommonAttachmentTitle(commonMockAttachmentData[0].title),
                        path: new CommonAttachmentPath(commonMockAttachmentData[0].path),
                        filename: new CommonAttachmentFilename(commonMockAttachmentData[0].filename),
                        url: new CommonAttachmentUrl(commonMockAttachmentData[0].url),
                        mime: new CommonAttachmentMime(commonMockAttachmentData[0].mime),
                        extension: new CommonAttachmentExtension(commonMockAttachmentData[0].extension),
                        size: new CommonAttachmentSize(commonMockAttachmentData[0].size),
                        width: new CommonAttachmentWidth(commonMockAttachmentData[0].width),
                        height: new CommonAttachmentHeight(commonMockAttachmentData[0].height),
                        libraryId: new CommonAttachmentLibraryId(commonMockAttachmentData[0].libraryId),
                        libraryFilename: new CommonAttachmentLibraryFilename(commonMockAttachmentData[0].libraryFilename),
                        meta: new CommonAttachmentMeta(commonMockAttachmentData[0].meta),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});