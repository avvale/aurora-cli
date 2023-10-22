import { queueManagerMockJobRegistryData, QueueManagerUpsertJobRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerUpsertJobRegistryCommandHandler } from '@app/queue-manager/job-registry/application/upsert/queue-manager-upsert-job-registry.command-handler';
import { QueueManagerUpsertJobRegistryService } from '@app/queue-manager/job-registry/application/upsert/queue-manager-upsert-job-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertJobRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerUpsertJobRegistryCommandHandler;
    let service: QueueManagerUpsertJobRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpsertJobRegistryCommandHandler,
                {
                    provide : QueueManagerUpsertJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpsertJobRegistryCommandHandler>(QueueManagerUpsertJobRegistryCommandHandler);
        service = module.get<QueueManagerUpsertJobRegistryService>(QueueManagerUpsertJobRegistryService);
    });

    describe('main', () =>
    {
        test('UpsertJobRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the QueueManagerUpsertJobRegistryService', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerUpsertJobRegistryCommand(
                    {
                        id: queueManagerMockJobRegistryData[0].id,
                        queueName: queueManagerMockJobRegistryData[0].queueName,
                        state: queueManagerMockJobRegistryData[0].state,
                        jobId: queueManagerMockJobRegistryData[0].jobId,
                        jobName: queueManagerMockJobRegistryData[0].jobName,
                        tags: queueManagerMockJobRegistryData[0].tags,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
