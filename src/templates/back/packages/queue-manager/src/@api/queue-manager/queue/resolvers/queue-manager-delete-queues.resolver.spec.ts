/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteQueuesResolver } from './queue-manager-delete-queues.resolver';
import { QueueManagerDeleteQueuesHandler } from '../handlers/queue-manager-delete-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerDeleteQueuesResolver', () =>
{
    let resolver: QueueManagerDeleteQueuesResolver;
    let handler: QueueManagerDeleteQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteQueuesResolver,
                {
                    provide : QueueManagerDeleteQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerDeleteQueuesResolver>(QueueManagerDeleteQueuesResolver);
        handler = module.get<QueueManagerDeleteQueuesHandler>(QueueManagerDeleteQueuesHandler);
    });

    test('QueueManagerDeleteQueuesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueuesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queues deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues)));
            expect(await resolver.main()).toBe(queues);
        });
    });
});