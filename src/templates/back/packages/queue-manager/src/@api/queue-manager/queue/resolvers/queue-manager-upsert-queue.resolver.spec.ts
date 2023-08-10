/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerUpsertQueueHandler, QueueManagerUpsertQueueResolver } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(await resolver.main(<QueueManagerUpdateQueueByIdInput>queueManagerMockQueueData[0])).toBe(queueManagerMockQueueData[0]);
        });
    });
});
