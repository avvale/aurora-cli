/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpsertQueueResolver } from './queue-manager-upsert-queue.resolver';
import { QueueManagerUpsertQueueHandler } from '../handlers/queue-manager-upsert-queue.handler';
import { QueueManagerUpdateQueueByIdInput } from '@api/graphql';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerUpsertQueueResolver', () =>
{
    let resolver: QueueManagerUpsertQueueResolver;
    let handler: QueueManagerUpsertQueueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpsertQueueResolver,
                {
                    provide : QueueManagerUpsertQueueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpsertQueueResolver>(QueueManagerUpsertQueueResolver);
        handler = module.get<QueueManagerUpsertQueueHandler>(QueueManagerUpsertQueueHandler);
    });

    test('QueueManagerUpsertQueueResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertQueueResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queue upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await resolver.main(<QueueManagerUpdateQueueByIdInput>queues[0])).toBe(queues[0]);
        });
    });
});