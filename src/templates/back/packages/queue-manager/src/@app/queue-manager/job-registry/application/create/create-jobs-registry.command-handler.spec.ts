/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { CreateJobsRegistryCommandHandler } from './create-jobs-registry.command-handler';
import { CreateJobsRegistryCommand } from './create-jobs-registry.command';
import { CreateJobsRegistryService } from './create-jobs-registry.service';

describe('CreateJobsRegistryCommandHandler', () =>
{
    let commandHandler: CreateJobsRegistryCommandHandler;
    let service: CreateJobsRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobsRegistryCommandHandler,
                {
                    provide : CreateJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateJobsRegistryCommandHandler>(CreateJobsRegistryCommandHandler);
        service = module.get<CreateJobsRegistryService>(CreateJobsRegistryService);
    });

    describe('main', () =>
    {
        test('CreateJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return jobsRegistry createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateJobsRegistryCommand(
                    jobsRegistry,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});