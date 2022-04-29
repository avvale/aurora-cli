import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteBoundedContextsCommandHandler } from './delete-bounded-contexts.command-handler';
import { DeleteBoundedContextsCommand } from './delete-bounded-contexts.command';
import { DeleteBoundedContextsService } from './delete-bounded-contexts.service';

describe('DeleteBoundedContextsCommandHandler', () =>
{
    let commandHandler: DeleteBoundedContextsCommandHandler;
    let service: DeleteBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteBoundedContextsCommandHandler,
                {
                    provide: DeleteBoundedContextsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteBoundedContextsCommandHandler>(DeleteBoundedContextsCommandHandler);
        service         = module.get<DeleteBoundedContextsService>(DeleteBoundedContextsService);
    });

    describe('main', () =>
    {
        test('DeleteBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteBoundedContextsCommand()
            )).toBe(undefined);
        });
    });
});