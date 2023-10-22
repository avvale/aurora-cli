import { QueueManagerCreateJobsRegistryCommand, queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { QueueManagerCreateJobsRegistryCommandHandler } from '@app/queue-manager/job-registry/application/create/queue-manager-create-jobs-registry.command-handler';
import { QueueManagerCreateJobsRegistryService } from '@app/queue-manager/job-registry/application/create/queue-manager-create-jobs-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('queueManagerCreateJobsRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerCreateJobsRegistryCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateJobsRegistryCommandHandler,
                {
                    provide : QueueManagerCreateJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerCreateJobsRegistryCommandHandler>(QueueManagerCreateJobsRegistryCommandHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return QueueManagerMockJobRegistryData created', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerCreateJobsRegistryCommand(
                    queueManagerMockJobRegistryData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
