import { queueManagerMockJobRegistryData, QueueManagerUpdateJobRegistryByIdCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateJobRegistryByIdCommandHandler } from '@app/queue-manager/job-registry/application/update/queue-manager-update-job-registry-by-id.command-handler';
import { QueueManagerUpdateJobRegistryByIdService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-job-registry-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobRegistryByIdCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateJobRegistryByIdCommandHandler;

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
