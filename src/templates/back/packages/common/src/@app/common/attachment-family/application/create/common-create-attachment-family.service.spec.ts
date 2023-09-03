/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentFamilyRepository, commonMockAttachmentFamilyData, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonCreateAttachmentFamilyService } from '@app/common/attachment-family/application/create/common-create-attachment-family.service';
import {
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyWidth,
} from '@app/common/attachment-family/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamilyService', () =>

{
    let service: CommonCreateAttachmentFamilyService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAttachmentFamilyService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAttachmentFamilyService);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentFamilyService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a attachmentFamily and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonAttachmentFamilyId(commonMockAttachmentFamilyData[0].id),
                        resourceId: new CommonAttachmentFamilyResourceId(commonMockAttachmentFamilyData[0].resourceId),
                        name: new CommonAttachmentFamilyName(commonMockAttachmentFamilyData[0].name),
                        width: new CommonAttachmentFamilyWidth(commonMockAttachmentFamilyData[0].width),
                        height: new CommonAttachmentFamilyHeight(commonMockAttachmentFamilyData[0].height),
                        fitType: new CommonAttachmentFamilyFitType(commonMockAttachmentFamilyData[0].fitType),
                        quality: new CommonAttachmentFamilyQuality(commonMockAttachmentFamilyData[0].quality),
                        sizes: new CommonAttachmentFamilySizes(commonMockAttachmentFamilyData[0].sizes),
                        format: new CommonAttachmentFamilyFormat(commonMockAttachmentFamilyData[0].format),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
