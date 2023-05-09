/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateQueueResolver } from './queue-manager-create-queue.resolver';
import { QueueManagerCreateQueueHandler } from '../handlers/queue-manager-create-queue.handler';
import { QueueManagerCreateQueueInput } from '@api/graphql';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerCreateQueueResolver', () =>
{
    let resolver: QueueManagerCreateQueueResolver;
    let handler: QueueManagerCreateQueueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerCreateQueueResolver,
                {
                    provide : QueueManagerCreateQueueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerCreateQueueResolver>(QueueManagerCreateQueueResolver);
        handler = module.get<QueueManagerCreateQueueHandler>(QueueManagerCreateQueueHandler);
    });

    test('QueueManagerCreateQueueResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueueResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queue created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main(<QueueManagerCreateQueueInput>queues[0])).toBe(queues[0]);
        });
    });
});