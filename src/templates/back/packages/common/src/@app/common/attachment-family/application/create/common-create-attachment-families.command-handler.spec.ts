/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonCreateAttachmentFamiliesCommandHandler } from './common-create-attachment-families.command-handler';
import { CommonCreateAttachmentFamiliesCommand } from './common-create-attachment-families.command';
import { CommonCreateAttachmentFamiliesService } from './common-create-attachment-families.service';

describe('commonCreateAttachmentFamiliesCommandHandler', () =>
{
    let commandHandler: CommonCreateAttachmentFamiliesCommandHandler;
    let service: CommonCreateAttachmentFamiliesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentFamiliesCommandHandler,
                {
                    provide : CommonCreateAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAttachmentFamiliesCommandHandler>(CommonCreateAttachmentFamiliesCommandHandler);
        service = module.get<CommonCreateAttachmentFamiliesService>(CommonCreateAttachmentFamiliesService);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentFamiliesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockAttachmentFamilyData createds', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAttachmentFamiliesCommand(
                    commonMockAttachmentFamilyData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
