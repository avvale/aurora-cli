/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAttachmentFamilyRepository, commonMockAttachmentFamilyData, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonUpsertAttachmentFamilyService } from '@app/common/attachment-family/application/upsert/common-upsert-attachment-family.service';
import {
    CommonAttachmentFamilyCode,
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

describe('CommonUpsertAttachmentFamilyService', () =>

{
    let service: CommonUpsertAttachmentFamilyService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpsertAttachmentFamilyService,
                CommonMockAttachmentFamilyRepository,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpsertAttachmentFamilyService);
    });

    describe('main', () =>
    {
        test('CommonUpsertAttachmentFamilyService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a attachmentFamily and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonAttachmentFamilyId(commonMockAttachmentFamilyData[0].id),
                        resourceId: new CommonAttachmentFamilyResourceId(commonMockAttachmentFamilyData[0].resourceId),
                        code: new CommonAttachmentFamilyCode(commonMockAttachmentFamilyData[0].code),
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
