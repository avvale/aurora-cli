import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobRegistryByIdCommandHandler } from './delete-job-registry-by-id.command-handler';
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { DeleteJobRegistryByIdCommand } from './delete-job-registry-by-id.command';
import { DeleteJobRegistryByIdService } from './delete-job-registry-by-id.service';

describe('DeleteJobRegistryByIdCommandHandler', () =>
{
    let commandHandler: DeleteJobRegistryByIdCommandHandler;
    let service: DeleteJobRegistryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteJobRegistryByIdCommandHandler,
                {
                    provide : DeleteJobRegistryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteJobRegistryByIdCommandHandler>(DeleteJobRegistryByIdCommandHandler);
        service = module.get<DeleteJobRegistryByIdService>(DeleteJobRegistryByIdService);
    });

    describe('main', () =>
    {
        test('DeleteJobRegistryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteJobRegistryByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteJobRegistryByIdCommand(
                    jobsRegistry[0].id,
                ),
            )).toBe(undefined);
        });
    });
});