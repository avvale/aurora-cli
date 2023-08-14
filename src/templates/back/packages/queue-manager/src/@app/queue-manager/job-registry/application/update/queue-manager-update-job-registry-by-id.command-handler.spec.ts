import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerUpdateJobRegistryByIdCommandHandler } from './queue-manager-update-job-registry-by-id.command-handler';
import { QueueManagerUpdateJobRegistryByIdCommand } from './queue-manager-update-job-registry-by-id.command';
import { QueueManagerUpdateJobRegistryByIdService } from './queue-manager-update-job-registry-by-id.service';

describe('QueueManagerUpdateJobRegistryByIdCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateJobRegistryByIdCommandHandler;
    let service: QueueManagerUpdateJobRegistryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpdateJobRegistryByIdCommandHandler,
                {
                    provide : QueueManagerUpdateJobRegistryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpdateJobRegistryByIdCommandHandler>(QueueManagerUpdateJobRegistryByIdCommandHandler);
        service = module.get<QueueManagerUpdateJobRegistryByIdService>(QueueManagerUpdateJobRegistryByIdService);
    });

    describe('main', () =>
    {
        test('UpdateJobRegistryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobRegistry created', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerUpdateJobRegistryByIdCommand(
                    {
                        id: queueManagerMockJobRegistryData[0].id,
                        queueName: queueManagerMockJobRegistryData[0].queueName,
                        state: queueManagerMockJobRegistryData[0].state,
                        jobId: queueManagerMockJobRegistryData[0].jobId,
                        jobName: queueManagerMockJobRegistryData[0].jobName,
                        tags: queueManagerMockJobRegistryData[0].tags,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
