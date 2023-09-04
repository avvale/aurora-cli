import { CommonDeleteAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { CommonDeleteAttachmentFamiliesCommandHandler } from '@app/common/attachment-family/application/delete/common-delete-attachment-families.command-handler';
import { CommonDeleteAttachmentFamiliesService } from '@app/common/attachment-family/application/delete/common-delete-attachment-families.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamiliesCommandHandler', () =>
{
    let commandHandler: CommonDeleteAttachmentFamiliesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAttachmentFamiliesCommandHandler,
                {
                    provide : CommonDeleteAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAttachmentFamiliesCommandHandler>(CommonDeleteAttachmentFamiliesCommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamiliesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAttachmentFamiliesCommand(),
            )).toBe(undefined);
        });
    });
});
