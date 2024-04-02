import { iamMockTagData, IamUpdateAndIncrementTagsCommand } from '@app/iam/tag';
import { IamUpdateAndIncrementTagsCommandHandler } from '@app/iam/tag/application/update/iam-update-and-increment-tags.command-handler';
import { IamUpdateAndIncrementTagsService } from '@app/iam/tag/application/update/iam-update-and-increment-tags.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementTagsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementTagsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementTagsCommandHandler,
                {
                    provide : IamUpdateAndIncrementTagsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementTagsCommandHandler>(IamUpdateAndIncrementTagsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementTagsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tags updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementTagsCommand(
                    {
                        id: iamMockTagData[0].id,
                        name: iamMockTagData[0].name,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
