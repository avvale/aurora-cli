import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteJobRegistryByIdCommandHandler } from './queue-manager-delete-job-registry-by-id.command-handler';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerDeleteJobRegistryByIdCommand } from './queue-manager-delete-job-registry-by-id.command';
import { QueueManagerDeleteJobRegistryByIdService } from './queue-manager-delete-job-registry-by-id.service';

describe('QueueManagerDeleteJobRegistryByIdCommandHandler', () =>
{
    let commandHandler: QueueManagerDeleteJobRegistryByIdCommandHandler;
    let service: QueueManagerDeleteJobRegistryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteJobRegistryByIdCommandHandler,
                {
                    provide : QueueManagerDeleteJobRegistryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerDeleteJobRegistryByIdCommandHandler>(QueueManagerDeleteJobRegistryByIdCommandHandler);
        service = module.get<QueueManagerDeleteJobRegistryByIdService>(QueueManagerDeleteJobRegistryByIdService);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobRegistryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the QueueManagerDeleteJobRegistryByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerDeleteJobRegistryByIdCommand(
                    queueManagerMockJobRegistryData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
