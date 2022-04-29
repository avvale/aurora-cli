import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { CreateBoundedContextCommandHandler } from './create-bounded-context.command-handler';
import { CreateBoundedContextCommand } from './create-bounded-context.command';
import { CreateBoundedContextService } from './create-bounded-context.service';

describe('CreateBoundedContextCommandHandler', () =>
{
    let commandHandler: CreateBoundedContextCommandHandler;
    let service: CreateBoundedContextService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateBoundedContextCommandHandler,
                {
                    provide : CreateBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreateBoundedContextCommandHandler>(CreateBoundedContextCommandHandler);
        service         = module.get<CreateBoundedContextService>(CreateBoundedContextService);
    });

    describe('main', () =>
    {
        test('CreateBoundedContextCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateBoundedContextService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateBoundedContextCommand(
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