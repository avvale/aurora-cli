import { queueManagerMockJobRegistryData, QueueManagerUpdateAndIncrementJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateAndIncrementJobsRegistryCommandHandler } from '@app/queue-manager/job-registry/application/update/queue-manager-update-and-increment-jobs-registry.command-handler';
import { QueueManagerUpdateAndIncrementJobsRegistryService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-and-increment-jobs-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateAndIncrementJobsRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateAndIncrementJobsRegistryCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpdateAndIncrementJobsRegistryCommandHandler,
                {
                    provide : QueueManagerUpdateAndIncrementJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpdateAndIncrementJobsRegistryCommandHandler>(QueueManagerUpdateAndIncrementJobsRegistryCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobsRegistry updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new QueueManagerUpdateAndIncrementJobsRegistryCommand(
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
            /* eslint-enable key-spacing */
        });
    });
});
