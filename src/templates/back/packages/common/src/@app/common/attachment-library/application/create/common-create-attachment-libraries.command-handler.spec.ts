import { CommonCreateAttachmentLibrariesCommand, commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { CommonCreateAttachmentLibrariesCommandHandler } from '@app/common/attachment-library/application/create/common-create-attachment-libraries.command-handler';
import { CommonCreateAttachmentLibrariesService } from '@app/common/attachment-library/application/create/common-create-attachment-libraries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateAttachmentLibrariesCommandHandler', () =>
{
    let commandHandler: CommonCreateAttachmentLibrariesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAttachmentLibrariesCommandHandler,
                {
                    provide : CommonCreateAttachmentLibrariesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAttachmentLibrariesCommandHandler>(CommonCreateAttachmentLibrariesCommandHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateAttachmentLibrariesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockAttachmentLibraryData created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAttachmentLibrariesCommand(
                    commonMockAttachmentLibraryData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
