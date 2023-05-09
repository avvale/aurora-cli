/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateQueuesResolver } from './queue-manager-update-queues.resolver';
import { QueueManagerUpdateQueuesHandler } from '../handlers/queue-manager-update-queues.handler';
import { QueueManagerUpdateQueuesInput } from '@api/graphql';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerUpdateQueuesResolver', () =>
{
    let resolver: QueueManagerUpdateQueuesResolver;
    let handler: QueueManagerUpdateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpdateQueuesResolver,
                {
                    provide : QueueManagerUpdateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpdateQueuesResolver>(QueueManagerUpdateQueuesResolver);
        handler = module.get<QueueManagerUpdateQueuesHandler>(QueueManagerUpdateQueuesHandler);
    });

    test('QueueManagerUpdateQueuesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueuesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a queues updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main(<QueueManagerUpdateQueuesInput>queues[0])).toBe(queues[0]);
        });
    });
});