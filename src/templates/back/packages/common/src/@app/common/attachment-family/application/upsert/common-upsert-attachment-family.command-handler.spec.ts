import { commonMockAttachmentFamilyData, CommonUpsertAttachmentFamilyCommand } from '@app/common/attachment-family';
import { CommonUpsertAttachmentFamilyCommandHandler } from '@app/common/attachment-family/application/upsert/common-upsert-attachment-family.command-handler';
import { CommonUpsertAttachmentFamilyService } from '@app/common/attachment-family/application/upsert/common-upsert-attachment-family.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentFamilyCommandHandler', () =>
{
    let commandHandler: CommonUpsertAttachmentFamilyCommandHandler;
    let service: CommonUpsertAttachmentFamilyService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertAttachmentFamilyCommandHandler,
                {
                    provide : CommonUpsertAttachmentFamilyService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertAttachmentFamilyCommandHandler>(CommonUpsertAttachmentFamilyCommandHandler);
        service = module.get<CommonUpsertAttachmentFamilyService>(CommonUpsertAttachmentFamilyService);
    });

    describe('main', () =>
    {
        test('UpsertAttachmentFamilyCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertAttachmentFamilyService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertAttachmentFamilyCommand(
                    {
                        id: commonMockAttachmentFamilyData[0].id,
                        resourceId: commonMockAttachmentFamilyData[0].resourceId,
                        name: commonMockAttachmentFamilyData[0].name,
                        width: commonMockAttachmentFamilyData[0].width,
                        height: commonMockAttachmentFamilyData[0].height,
                        fitType: commonMockAttachmentFamilyData[0].fitType,
                        quality: commonMockAttachmentFamilyData[0].quality,
                        sizes: commonMockAttachmentFamilyData[0].sizes,
                        format: commonMockAttachmentFamilyData[0].format,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
