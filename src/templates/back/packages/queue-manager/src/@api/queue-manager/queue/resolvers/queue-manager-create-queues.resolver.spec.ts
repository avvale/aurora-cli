import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateQueuesResolver } from './queue-manager-create-queues.resolver';
import { QueueManagerCreateQueuesHandler } from '../handlers/queue-manager-create-queues.handler';
import { QueueManagerCreateQueueInput } from '@api/graphql';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerCreateQueuesResolver', () =>
{
    let resolver: QueueManagerCreateQueuesResolver;
    let handler: QueueManagerCreateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateQueuesResolver,
                {
                    provide : QueueManagerCreateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerCreateQueuesResolver>(QueueManagerCreateQueuesResolver);
        handler = module.get<QueueManagerCreateQueuesHandler>(QueueManagerCreateQueuesHandler);
    });

    test('QueueManagerCreateQueuesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueuesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queues created', async () =>
        {
            expect(await resolver.main(<QueueManagerCreateQueueInput[]>queues)).toBe(undefined);
        });
    });
});