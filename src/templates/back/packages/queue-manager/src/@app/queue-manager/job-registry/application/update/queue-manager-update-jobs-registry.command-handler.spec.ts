import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerUpdateJobsRegistryCommandHandler } from './queue-manager-update-jobs-registry.command-handler';
import { QueueManagerUpdateJobsRegistryCommand } from './queue-manager-update-jobs-registry.command';
import { QueueManagerUpdateJobsRegistryService } from './queue-manager-update-jobs-registry.service';

describe('QueueManagerUpdateJobsRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateJobsRegistryCommandHandler;
    let service: QueueManagerUpdateJobsRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpdateJobsRegistryCommandHandler,
                {
                    provide : QueueManagerUpdateJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpdateJobsRegistryCommandHandler>(QueueManagerUpdateJobsRegistryCommandHandler);
        service = module.get<QueueManagerUpdateJobsRegistryService>(QueueManagerUpdateJobsRegistryService);
    });

    describe('main', () =>
    {
        test('UpdateJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobsRegistry updated', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerUpdateJobsRegistryCommand(
                    {
                        id: queueManagerMockJobRegistryData[0].id,
                        queueName: queueManagerMockJobRegistryData[0].queueName,
                        state: queueManagerMockJobRegistryData[0].state,
                        jobId: queueManagerMockJobRegistryData[0].jobId,
                        jobName: queueManagerMockJobRegistryData[0].jobName,
                        tags: queueManagerMockJobRegistryData[0].tags,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
