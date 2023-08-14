/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindQueueByIdHandler, QueueManagerFindQueueByIdResolver } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueByIdResolver', () =>
{
    let resolver: QueueManagerFindQueueByIdResolver;
    let handler: QueueManagerFindQueueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindQueueByIdResolver,
                {
                    provide : QueueManagerFindQueueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerFindQueueByIdResolver>(QueueManagerFindQueueByIdResolver);
        handler = module.get<QueueManagerFindQueueByIdHandler>(QueueManagerFindQueueByIdHandler);
    });

    test('QueueManagerFindQueueByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queue by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(await resolver.main(queueManagerMockQueueData[0].id)).toBe(queueManagerMockQueueData[0]);
        });
    });
});
