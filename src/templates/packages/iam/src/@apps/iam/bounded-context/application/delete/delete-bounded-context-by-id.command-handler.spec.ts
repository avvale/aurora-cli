import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteBoundedContextByIdCommandHandler } from './delete-bounded-context-by-id.command-handler';
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { DeleteBoundedContextByIdCommand } from './delete-bounded-context-by-id.command';
import { DeleteBoundedContextByIdService } from './delete-bounded-context-by-id.service';

describe('DeleteBoundedContextByIdCommandHandler', () =>
{
    let commandHandler: DeleteBoundedContextByIdCommandHandler;
    let service: DeleteBoundedContextByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteBoundedContextByIdCommandHandler,
                {
                    provide: DeleteBoundedContextByIdService,
                    useValue: {
                        main: () => {},
                    }
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteBoundedContextByIdCommandHandler>(DeleteBoundedContextByIdCommandHandler);
        service         = module.get<DeleteBoundedContextByIdService>(DeleteBoundedContextByIdService);
    });

    describe('main', () =>
    {
        test('DeleteBoundedContextByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteBoundedContextByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteBoundedContextByIdCommand(
                    boundedContexts[0].id,
                )
            )).toBe(undefined);
        });
    });
});