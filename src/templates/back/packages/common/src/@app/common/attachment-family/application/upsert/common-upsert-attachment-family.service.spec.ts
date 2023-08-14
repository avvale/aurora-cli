/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonUpsertAttachmentFamilyService } from './common-upsert-attachment-family.service';
import {
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyWidth,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyDeletedAt,
} from '../../domain/value-objects';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonMockAttachmentFamilyRepository } from '../../infrastructure/mock/common-mock-attachment-family.repository';

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
