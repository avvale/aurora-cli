import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { UpsertJobRegistryCommandHandler } from './upsert-job-registry.command-handler';
import { UpsertJobRegistryCommand } from './upsert-job-registry.command';
import { UpsertJobRegistryService } from './upsert-job-registry.service';

describe('UpsertJobRegistryCommandHandler', () =>
{
    let commandHandler: UpsertJobRegistryCommandHandler;
    let service: UpsertJobRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertJobRegistryCommandHandler,
                {
                    provide : UpsertJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpsertJobRegistryCommandHandler>(UpsertJobRegistryCommandHandler);
        service = module.get<UpsertJobRegistryService>(UpsertJobRegistryService);
    });

    describe('main', () =>
    {
        test('UpsertJobRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertJobRegistryService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertJobRegistryCommand(
                    {
                        id: jobsRegistry[0].id,
                        queueName: jobsRegistry[0].queueName,
                        state: jobsRegistry[0].state,
                        jobId: jobsRegistry[0].jobId,
                        jobName: jobsRegistry[0].jobName,
                        tags: jobsRegistry[0].tags,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});