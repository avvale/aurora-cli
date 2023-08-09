import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonUpdateAttachmentFamilyByIdCommandHandler } from './common-update-attachment-family-by-id.command-handler';
import { CommonUpdateAttachmentFamilyByIdCommand } from './common-update-attachment-family-by-id.command';
import { CommonUpdateAttachmentFamilyByIdService } from './common-update-attachment-family-by-id.service';

describe('CommonUpdateAttachmentFamilyByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateAttachmentFamilyByIdCommandHandler;
    let service: CommonUpdateAttachmentFamilyByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAttachmentFamilyByIdCommandHandler,
                {
                    provide : CommonUpdateAttachmentFamilyByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAttachmentFamilyByIdCommandHandler>(CommonUpdateAttachmentFamilyByIdCommandHandler);
        service = module.get<CommonUpdateAttachmentFamilyByIdService>(CommonUpdateAttachmentFamilyByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentFamilyByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentFamily created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAttachmentFamilyByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
