import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { boundedContexts } from '@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { UpdateBoundedContextsCommandHandler } from './update-bounded-contexts.command-handler';
import { UpdateBoundedContextsCommand } from './update-bounded-contexts.command';
import { UpdateBoundedContextsService } from './update-bounded-contexts.service';

describe('UpdateBoundedContextsCommandHandler', () =>
{
    let commandHandler: UpdateBoundedContextsCommandHandler;
    let service: UpdateBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateBoundedContextsCommandHandler,
                {
                    provide : UpdateBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateBoundedContextsCommandHandler>(UpdateBoundedContextsCommandHandler);
        service         = module.get<UpdateBoundedContextsService>(UpdateBoundedContextsService);
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
                new UpdateBoundedContextsCommand(
                    {
                        id: boundedContexts[0].id,
                        name: boundedContexts[0].name,
                        root: boundedContexts[0].root,
                        sort: boundedContexts[0].sort,
                        isActive: boundedContexts[0].isActive,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});