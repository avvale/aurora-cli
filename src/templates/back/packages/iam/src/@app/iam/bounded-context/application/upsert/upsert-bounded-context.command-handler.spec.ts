import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';
import { UpsertBoundedContextCommandHandler } from './upsert-bounded-context.command-handler';
import { UpsertBoundedContextCommand } from './upsert-bounded-context.command';
import { UpsertBoundedContextService } from './upsert-bounded-context.service';

describe('UpsertBoundedContextCommandHandler', () =>
{
    let commandHandler: UpsertBoundedContextCommandHandler;
    let service: UpsertBoundedContextService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertBoundedContextCommandHandler,
                {
                    provide : UpsertBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertBoundedContextCommandHandler>(UpsertBoundedContextCommandHandler);
        service         = module.get<UpsertBoundedContextService>(UpsertBoundedContextService);
    });

    describe('main', () =>
    {
        test('UpsertBoundedContextCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertBoundedContextService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertBoundedContextCommand(
                    {
                        id: boundedContexts[0].id,
                        name: boundedContexts[0].name,
                        root: boundedContexts[0].root,
                        sort: boundedContexts[0].sort,
                        isActive: boundedContexts[0].isActive,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});