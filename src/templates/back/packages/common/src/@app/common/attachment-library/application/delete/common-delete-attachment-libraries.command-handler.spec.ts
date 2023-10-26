import { CommonDeleteAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { CommonDeleteAttachmentLibrariesCommandHandler } from '@app/common/attachment-library/application/delete/common-delete-attachment-libraries.command-handler';
import { CommonDeleteAttachmentLibrariesService } from '@app/common/attachment-library/application/delete/common-delete-attachment-libraries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibrariesCommandHandler', () =>
{
    let commandHandler: CommonDeleteAttachmentLibrariesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAttachmentLibrariesCommandHandler,
                {
                    provide : CommonDeleteAttachmentLibrariesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAttachmentLibrariesCommandHandler>(CommonDeleteAttachmentLibrariesCommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentLibrariesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAttachmentLibrariesCommand(),
            )).toBe(undefined);
        });
    });
});
