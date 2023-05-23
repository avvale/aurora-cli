import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { CreateJobRegistryCommandHandler } from './create-job-registry.command-handler';
import { CreateJobRegistryCommand } from './create-job-registry.command';
import { CreateJobRegistryService } from './create-job-registry.service';

describe('CreateJobRegistryCommandHandler', () =>
{
    let commandHandler: CreateJobRegistryCommandHandler;
    let service: CreateJobRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobRegistryCommandHandler,
                {
                    provide : CreateJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateJobRegistryCommandHandler>(CreateJobRegistryCommandHandler);
        service = module.get<CreateJobRegistryService>(CreateJobRegistryService);
    });

    describe('main', () =>
    {
        test('CreateJobRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateJobRegistryService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateJobRegistryCommand(
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