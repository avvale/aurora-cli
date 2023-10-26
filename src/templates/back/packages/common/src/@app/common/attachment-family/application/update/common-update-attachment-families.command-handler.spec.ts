import { commonMockAttachmentFamilyData, CommonUpdateAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { CommonUpdateAttachmentFamiliesCommandHandler } from '@app/common/attachment-family/application/update/common-update-attachment-families.command-handler';
import { CommonUpdateAttachmentFamiliesService } from '@app/common/attachment-family/application/update/common-update-attachment-families.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentFamiliesCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentFamiliesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAttachmentFamiliesCommandHandler,
                {
                    provide : CommonUpdateAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAttachmentFamiliesCommandHandler>(CommonUpdateAttachmentFamiliesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentFamiliesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentFamilies updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAttachmentFamiliesCommand(
                    {
                        id: commonMockAttachmentFamilyData[0].id,
                        resourceId: commonMockAttachmentFamilyData[0].resourceId,
                        code: commonMockAttachmentFamilyData[0].code,
                        name: commonMockAttachmentFamilyData[0].name,
                        width: commonMockAttachmentFamilyData[0].width,
                        height: commonMockAttachmentFamilyData[0].height,
                        fitType: commonMockAttachmentFamilyData[0].fitType,
                        quality: commonMockAttachmentFamilyData[0].quality,
                        sizes: commonMockAttachmentFamilyData[0].sizes,
                        format: commonMockAttachmentFamilyData[0].format,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
