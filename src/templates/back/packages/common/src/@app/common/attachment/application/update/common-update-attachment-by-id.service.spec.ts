/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentRepository, commonMockAttachmentData, CommonMockAttachmentRepository } from '@app/common/attachment';
import { CommonUpdateAttachmentByIdService } from '@app/common/attachment/application/update/common-update-attachment-by-id.service';
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

describe('CommonUpdateAttachmentByIdService', () =>
{
    let service: CommonUpdateAttachmentByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateAttachmentByIdService,
                CommonMockAttachmentRepository,
                {
                    provide : CommonIAttachmentRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateAttachmentByIdService);
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a attachment and emit event', async () =>
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
                    {},
                ),
            ).toBe(undefined);
        });
    });
});