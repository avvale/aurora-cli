import { queueManagerMockJobRegistryData, QueueManagerUpdateJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateJobsRegistryCommandHandler } from '@app/queue-manager/job-registry/application/update/queue-manager-update-jobs-registry.command-handler';
import { QueueManagerUpdateJobsRegistryService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-jobs-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobsRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateJobsRegistryCommandHandler;

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
