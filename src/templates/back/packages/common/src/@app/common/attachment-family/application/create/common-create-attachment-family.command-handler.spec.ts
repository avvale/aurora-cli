import { CommonCreateAttachmentFamilyCommandHandler } from './common-create-attachment-family.command-handler';
import { CommonCreateAttachmentFamilyService } from './common-create-attachment-family.service';
import { CommonCreateAttachmentFamilyCommand, commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamilyCommandHandler', () =>
{
    let commandHandler: CommonCreateAttachmentFamilyCommandHandler;
    let service: CommonCreateAttachmentFamilyService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentFamilyCommandHandler,
                {
                    provide : CommonCreateAttachmentFamilyService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAttachmentFamilyCommandHandler>(CommonCreateAttachmentFamilyCommandHandler);
        service = module.get<CommonCreateAttachmentFamilyService>(CommonCreateAttachmentFamilyService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentFamilyCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateAttachmentFamilyService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAttachmentFamilyCommand(
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
