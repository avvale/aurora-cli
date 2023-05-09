/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindQueueResolver } from './queue-manager-find-queue.resolver';
import { QueueManagerFindQueueHandler } from '../handlers/queue-manager-find-queue.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerFindQueueResolver', () =>
{
    let resolver: QueueManagerFindQueueResolver;
    let handler: QueueManagerFindQueueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindQueueResolver,
                {
                    provide : QueueManagerFindQueueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerFindQueueResolver>(QueueManagerFindQueueResolver);
        handler = module.get<QueueManagerFindQueueHandler>(QueueManagerFindQueueHandler);
    });

    test('QueueManagerFindQueueResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a queue', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main()).toBe(queues[0]);
        });
    });
});