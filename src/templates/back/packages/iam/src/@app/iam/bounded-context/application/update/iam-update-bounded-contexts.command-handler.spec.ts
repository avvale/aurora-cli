import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockBoundedContextData } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.data';
import { IamUpdateBoundedContextsCommandHandler } from './iam-update-bounded-contexts.command-handler';
import { IamUpdateBoundedContextsCommand } from './iam-update-bounded-contexts.command';
import { IamUpdateBoundedContextsService } from './iam-update-bounded-contexts.service';

describe('IamUpdateBoundedContextsCommandHandler', () =>
{
    let commandHandler: IamUpdateBoundedContextsCommandHandler;
    let service: IamUpdateBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateBoundedContextsCommandHandler,
                {
                    provide : IamUpdateBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateBoundedContextsCommandHandler>(IamUpdateBoundedContextsCommandHandler);
        service = module.get<IamUpdateBoundedContextsService>(IamUpdateBoundedContextsService);
    });

    describe('main', () =>
    {
        test('UpdateBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContexts updated', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateBoundedContextsCommand(
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
        });
    });
});
