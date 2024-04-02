import { iamMockTagData, IamUpdateTagsCommand } from '@app/iam/tag';
import { IamUpdateTagsCommandHandler } from '@app/iam/tag/application/update/iam-update-tags.command-handler';
import { IamUpdateTagsService } from '@app/iam/tag/application/update/iam-update-tags.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagsCommandHandler', () =>
{
    let commandHandler: IamUpdateTagsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateTagsCommandHandler,
                {
                    provide : IamUpdateTagsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateTagsCommandHandler>(IamUpdateTagsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateTagsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tags updated', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateTagsCommand(
                    {
                        id: iamMockTagData[0].id,
                        name: iamMockTagData[0].name,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
