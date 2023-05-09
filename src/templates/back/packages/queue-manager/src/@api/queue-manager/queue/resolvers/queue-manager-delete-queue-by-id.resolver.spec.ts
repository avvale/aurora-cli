/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteQueueByIdResolver } from './queue-manager-delete-queue-by-id.resolver';
import { QueueManagerDeleteQueueByIdHandler } from '../handlers/queue-manager-delete-queue-by-id.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerDeleteQueueByIdResolver', () =>
{
    let resolver: QueueManagerDeleteQueueByIdResolver;
    let handler: QueueManagerDeleteQueueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteQueueByIdResolver,
                {
                    provide : QueueManagerDeleteQueueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerDeleteQueueByIdResolver>(QueueManagerDeleteQueueByIdResolver);
        handler = module.get<QueueManagerDeleteQueueByIdHandler>(QueueManagerDeleteQueueByIdHandler);
    });

    test('QueueManagerDeleteQueueByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueueByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queue deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main(queues[0].id)).toBe(queues[0]);
        });
    });
});