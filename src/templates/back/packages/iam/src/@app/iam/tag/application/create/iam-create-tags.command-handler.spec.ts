import { IamCreateTagsCommand, iamMockTagData } from '@app/iam/tag';
import { IamCreateTagsCommandHandler } from '@app/iam/tag/application/create/iam-create-tags.command-handler';
import { IamCreateTagsService } from '@app/iam/tag/application/create/iam-create-tags.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateTagsCommandHandler', () =>
{
    let commandHandler: IamCreateTagsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTagsCommandHandler,
                {
                    provide : IamCreateTagsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateTagsCommandHandler>(IamCreateTagsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTagsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockTagData created', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateTagsCommand(
                    iamMockTagData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
