/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindQueueByIdResolver } from './queue-manager-find-queue-by-id.resolver';
import { QueueManagerFindQueueByIdHandler } from '../handlers/queue-manager-find-queue-by-id.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main(queues[0].id)).toBe(queues[0]);
        });
    });
});