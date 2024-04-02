import { iamMockBoundedContextData, IamUpdateAndIncrementBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamUpdateAndIncrementBoundedContextsCommandHandler } from '@app/iam/bounded-context/application/update/iam-update-and-increment-bounded-contexts.command-handler';
import { IamUpdateAndIncrementBoundedContextsService } from '@app/iam/bounded-context/application/update/iam-update-and-increment-bounded-contexts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementBoundedContextsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementBoundedContextsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementBoundedContextsCommandHandler,
                {
                    provide : IamUpdateAndIncrementBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementBoundedContextsCommandHandler>(IamUpdateAndIncrementBoundedContextsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContexts updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementBoundedContextsCommand(
                    {
                        id: iamMockBoundedContextData[0].id,
                        name: iamMockBoundedContextData[0].name,
                        root: iamMockBoundedContextData[0].root,
                        sort: iamMockBoundedContextData[0].sort,
                        isActive: iamMockBoundedContextData[0].isActive,
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
