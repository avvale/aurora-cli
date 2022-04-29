import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { UpdateBoundedContextCommandHandler } from './update-bounded-context.command-handler';
import { UpdateBoundedContextCommand } from './update-bounded-context.command';
import { UpdateBoundedContextService } from './update-bounded-context.service';

describe('UpdateBoundedContextCommandHandler', () =>
{
    let commandHandler: UpdateBoundedContextCommandHandler;
    let service: UpdateBoundedContextService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateBoundedContextCommandHandler,
                {
                    provide : UpdateBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateBoundedContextCommandHandler>(UpdateBoundedContextCommandHandler);
        service         = module.get<UpdateBoundedContextService>(UpdateBoundedContextService);
    });

    describe('main', () =>
    {
        test('UpdateBoundedContextCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateBoundedContextCommand(
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