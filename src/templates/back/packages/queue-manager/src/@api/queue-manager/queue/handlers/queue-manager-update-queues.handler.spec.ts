/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerUpdateQueuesHandler } from './queue-manager-update-queues.handler';
import { QueueManagerUpdateQueuesInput } from '@api/graphql';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerUpdateQueuesHandler', () =>
{
    let handler: QueueManagerUpdateQueuesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpdateQueuesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<QueueManagerUpdateQueuesHandler>(QueueManagerUpdateQueuesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerUpdateQueuesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueuesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a queues updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await handler.main(<QueueManagerUpdateQueuesInput>queues[0])).toBe(queues[0]);
        });
    });
});