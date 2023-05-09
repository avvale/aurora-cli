import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { UpsertQueueCommandHandler } from './upsert-queue.command-handler';
import { UpsertQueueCommand } from './upsert-queue.command';
import { UpsertQueueService } from './upsert-queue.service';

describe('UpsertQueueCommandHandler', () =>
{
    let commandHandler: UpsertQueueCommandHandler;
    let service: UpsertQueueService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertQueueCommandHandler,
                {
                    provide : UpsertQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpsertQueueCommandHandler>(UpsertQueueCommandHandler);
        service = module.get<UpsertQueueService>(UpsertQueueService);
    });

    describe('main', () =>
    {
        test('UpsertQueueCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertQueueService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertQueueCommand(
                    {
                        id: queues[0].id,
                        prefix: queues[0].prefix,
                        name: queues[0].name,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});