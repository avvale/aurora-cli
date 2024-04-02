import { IamDeleteTagsCommand } from '@app/iam/tag';
import { IamDeleteTagsCommandHandler } from '@app/iam/tag/application/delete/iam-delete-tags.command-handler';
import { IamDeleteTagsService } from '@app/iam/tag/application/delete/iam-delete-tags.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagsCommandHandler', () =>
{
    let commandHandler: IamDeleteTagsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTagsCommandHandler,
                {
                    provide : IamDeleteTagsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteTagsCommandHandler>(IamDeleteTagsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTagsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteTagsCommand(),
            )).toBe(undefined);
        });
    });
});
