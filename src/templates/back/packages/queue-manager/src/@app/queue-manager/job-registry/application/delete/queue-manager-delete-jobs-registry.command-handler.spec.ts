import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteJobsRegistryCommandHandler } from './queue-manager-delete-jobs-registry.command-handler';
import { QueueManagerDeleteJobsRegistryCommand } from './queue-manager-delete-jobs-registry.command';
import { QueueManagerDeleteJobsRegistryService } from './queue-manager-delete-jobs-registry.service';

describe('QueueManagerDeleteJobsRegistryCommandHandler', () =>
{
    let commandHandler: QueueManagerDeleteJobsRegistryCommandHandler;
    let service: QueueManagerDeleteJobsRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteJobsRegistryCommandHandler,
                {
                    provide : QueueManagerDeleteJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerDeleteJobsRegistryCommandHandler>(QueueManagerDeleteJobsRegistryCommandHandler);
        service = module.get<QueueManagerDeleteJobsRegistryService>(QueueManagerDeleteJobsRegistryService);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobsRegistryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerDeleteJobsRegistryCommand(),
            )).toBe(undefined);
        });
    });
});
