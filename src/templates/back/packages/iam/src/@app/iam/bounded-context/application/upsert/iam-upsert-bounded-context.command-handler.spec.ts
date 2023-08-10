import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockBoundedContextData } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.data';
import { IamUpsertBoundedContextCommandHandler } from './iam-upsert-bounded-context.command-handler';
import { IamUpsertBoundedContextCommand } from './iam-upsert-bounded-context.command';
import { IamUpsertBoundedContextService } from './iam-upsert-bounded-context.service';

describe('IamUpsertBoundedContextCommandHandler', () =>
{
    let commandHandler: IamUpsertBoundedContextCommandHandler;
    let service: IamUpsertBoundedContextService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertBoundedContextCommandHandler,
                {
                    provide : IamUpsertBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertBoundedContextCommandHandler>(IamUpsertBoundedContextCommandHandler);
        service = module.get<IamUpsertBoundedContextService>(IamUpsertBoundedContextService);
    });

    describe('main', () =>
    {
        test('UpsertBoundedContextCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertBoundedContextService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertBoundedContextCommand(
                    {
                        id: iamMockBoundedContextData[0].id,
                        name: iamMockBoundedContextData[0].name,
                        root: iamMockBoundedContextData[0].root,
                        sort: iamMockBoundedContextData[0].sort,
                        isActive: iamMockBoundedContextData[0].isActive,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
