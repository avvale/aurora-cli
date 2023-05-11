/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerFindQueueByIdHandler } from './queue-manager-find-queue-by-id.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerFindQueueByIdHandler', () =>
{
    let handler: QueueManagerFindQueueByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindQueueByIdHandler,
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

        handler = module.get<QueueManagerFindQueueByIdHandler>(QueueManagerFindQueueByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerFindQueueByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an queue by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await handler.main(queues[0].id)).toBe(queues[0]);
        });
    });
});