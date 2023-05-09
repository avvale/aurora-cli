import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobsRegistryCommandHandler } from './delete-jobs-registry.command-handler';
import { DeleteJobsRegistryCommand } from './delete-jobs-registry.command';
import { DeleteJobsRegistryService } from './delete-jobs-registry.service';

describe('DeleteJobsRegistryCommandHandler', () =>
{
    let commandHandler: DeleteJobsRegistryCommandHandler;
    let service: DeleteJobsRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteJobsRegistryCommandHandler,
                {
                    provide : DeleteJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteJobsRegistryCommandHandler>(DeleteJobsRegistryCommandHandler);
        service = module.get<DeleteJobsRegistryService>(DeleteJobsRegistryService);
    });

    describe('main', () =>
    {
        test('DeleteJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteJobsRegistryCommand(),
            )).toBe(undefined);
        });
    });
});