import { CommonDeleteAttachmentsCommand } from '@app/common/attachment';
import { CommonDeleteAttachmentsCommandHandler } from '@app/common/attachment/application/delete/common-delete-attachments.command-handler';
import { CommonDeleteAttachmentsService } from '@app/common/attachment/application/delete/common-delete-attachments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentsCommandHandler', () =>
{
    let commandHandler: CommonDeleteAttachmentsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAttachmentsCommandHandler,
                {
                    provide : CommonDeleteAttachmentsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAttachmentsCommandHandler>(CommonDeleteAttachmentsCommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAttachmentsCommand(),
            )).toBe(undefined);
        });
    });
});
