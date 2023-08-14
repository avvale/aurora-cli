import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonUpdateAttachmentFamiliesCommandHandler } from './common-update-attachment-families.command-handler';
import { CommonUpdateAttachmentFamiliesCommand } from './common-update-attachment-families.command';
import { CommonUpdateAttachmentFamiliesService } from './common-update-attachment-families.service';

describe('CommonUpdateAttachmentFamiliesCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentFamiliesCommandHandler;
    let service: CommonUpdateAttachmentFamiliesService;

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
        service = module.get<CommonUpdateAttachmentFamiliesService>(CommonUpdateAttachmentFamiliesService);
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
