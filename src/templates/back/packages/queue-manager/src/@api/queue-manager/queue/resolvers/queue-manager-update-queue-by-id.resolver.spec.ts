/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateQueueByIdResolver } from './queue-manager-update-queue-by-id.resolver';
import { QueueManagerUpdateQueueByIdHandler } from '../handlers/queue-manager-update-queue-by-id.handler';
import { QueueManagerUpdateQueueByIdInput } from '@api/graphql';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerUpdateQueueByIdResolver', () =>
{
    let resolver: QueueManagerUpdateQueueByIdResolver;
    let handler: QueueManagerUpdateQueueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpdateQueueByIdResolver,
                {
                    provide : QueueManagerUpdateQueueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpdateQueueByIdResolver>(QueueManagerUpdateQueueByIdResolver);
        handler = module.get<QueueManagerUpdateQueueByIdHandler>(QueueManagerUpdateQueueByIdHandler);
    });

    test('QueueManagerUpdateQueueByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueueByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a queue by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main(<QueueManagerUpdateQueueByIdInput>queues[0])).toBe(queues[0]);
        });
    });
});