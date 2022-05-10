import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { boundedContexts } from '@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { UpdateBoundedContextByIdCommandHandler } from './update-bounded-context-by-id.command-handler';
import { UpdateBoundedContextByIdCommand } from './update-bounded-context-by-id.command';
import { UpdateBoundedContextByIdService } from './update-bounded-context-by-id.service';

describe('UpdateBoundedContextByIdCommandHandler', () =>
{
    let commandHandler: UpdateBoundedContextByIdCommandHandler;
    let service: UpdateBoundedContextByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateBoundedContextByIdCommandHandler,
                {
                    provide : UpdateBoundedContextByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateBoundedContextByIdCommandHandler>(UpdateBoundedContextByIdCommandHandler);
        service         = module.get<UpdateBoundedContextByIdService>(UpdateBoundedContextByIdService);
    });

    describe('main', () =>
    {
        test('UpdateBoundedContextByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateBoundedContextByIdCommand(
                    {
                        id: boundedContexts[0].id,
                        name: boundedContexts[0].name,
                        root: boundedContexts[0].root,
                        sort: boundedContexts[0].sort,
                        isActive: boundedContexts[0].isActive,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});