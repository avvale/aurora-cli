import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { UpdateJobsRegistryCommandHandler } from './update-jobs-registry.command-handler';
import { UpdateJobsRegistryCommand } from './update-jobs-registry.command';
import { UpdateJobsRegistryService } from './update-jobs-registry.service';

describe('UpdateJobsRegistryCommandHandler', () =>
{
    let commandHandler: UpdateJobsRegistryCommandHandler;
    let service: UpdateJobsRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateJobsRegistryCommandHandler,
                {
                    provide : UpdateJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateJobsRegistryCommandHandler>(UpdateJobsRegistryCommandHandler);
        service = module.get<UpdateJobsRegistryService>(UpdateJobsRegistryService);
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
                new UpdateJobsRegistryCommand(
                    {
                        id: jobsRegistry[0].id,
                        queueName: jobsRegistry[0].queueName,
                        jobId: jobsRegistry[0].jobId,
                        jobName: jobsRegistry[0].jobName,
                        tags: jobsRegistry[0].tags,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});