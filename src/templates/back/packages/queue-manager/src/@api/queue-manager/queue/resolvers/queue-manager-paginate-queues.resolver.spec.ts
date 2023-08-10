/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerPaginateQueuesHandler, QueueManagerPaginateQueuesResolver } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateQueuesResolver', () =>
{
    let resolver: QueueManagerPaginateQueuesResolver;
    let handler: QueueManagerPaginateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerPaginateQueuesResolver,
                {
                    provide : QueueManagerPaginateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerPaginateQueuesResolver>(QueueManagerPaginateQueuesResolver);
        handler = module.get<QueueManagerPaginateQueuesHandler>(QueueManagerPaginateQueuesHandler);
    });

    test('QueueManagerPaginateQueuesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateQueuesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a queueManagerMockQueueData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : queueManagerMockQueueData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : queueManagerMockQueueData,
            });
        });
    });
});
