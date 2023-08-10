/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerCreateJobsRegistryCommandHandler } from './queue-manager-create-jobs-registry.command-handler';
import { QueueManagerCreateJobsRegistryCommand } from './queue-manager-create-jobs-registry.command';
import { QueueManagerCreateJobsRegistryService } from './queue-manager-create-jobs-registry.service';

describe('queueManagerCreateJobsRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerCreateJobsRegistryCommandHandler;
    let service: QueueManagerCreateJobsRegistryService;

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
        service = module.get<QueueManagerCreateJobsRegistryService>(QueueManagerCreateJobsRegistryService);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return QueueManagerMockJobRegistryData createds', async () =>
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
