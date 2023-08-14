/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindQueueHandler, QueueManagerFindQueueResolver } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(await resolver.main()).toBe(queueManagerMockQueueData[0]);
        });
    });
});
