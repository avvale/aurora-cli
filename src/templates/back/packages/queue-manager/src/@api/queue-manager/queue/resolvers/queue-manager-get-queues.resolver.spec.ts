/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerGetQueuesResolver } from './queue-manager-get-queues.resolver';
import { QueueManagerGetQueuesHandler } from '../handlers/queue-manager-get-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerGetQueuesResolver', () =>
{
    let resolver: QueueManagerGetQueuesResolver;
    let handler: QueueManagerGetQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerGetQueuesResolver,
                {
                    provide : QueueManagerGetQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerGetQueuesResolver>(QueueManagerGetQueuesResolver);
        handler = module.get<QueueManagerGetQueuesHandler>(QueueManagerGetQueuesHandler);
    });

    test('QueueManagerGetQueuesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerGetQueuesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a queues', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues)));
            expect(await resolver.main()).toBe(queues);
        });
    });
});