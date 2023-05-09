/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { CreateQueuesCommandHandler } from './create-queues.command-handler';
import { CreateQueuesCommand } from './create-queues.command';
import { CreateQueuesService } from './create-queues.service';

describe('CreateQueuesCommandHandler', () =>
{
    let commandHandler: CreateQueuesCommandHandler;
    let service: CreateQueuesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateQueuesCommandHandler,
                {
                    provide : CreateQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateQueuesCommandHandler>(CreateQueuesCommandHandler);
        service = module.get<CreateQueuesService>(CreateQueuesService);
    });

    describe('main', () =>
    {
        test('CreateQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return queues createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateQueuesCommand(
                    queues,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});