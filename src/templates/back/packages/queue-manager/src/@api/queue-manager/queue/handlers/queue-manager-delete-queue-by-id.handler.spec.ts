/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerDeleteQueueByIdHandler } from './queue-manager-delete-queue-by-id.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerDeleteQueueByIdController', () =>
{
    let handler: QueueManagerDeleteQueueByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteQueueByIdHandler,
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

        handler = module.get<QueueManagerDeleteQueueByIdHandler>(QueueManagerDeleteQueueByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueueByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an queue deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await handler.main(queues[0].id)).toBe(queues[0]);
        });
    });
});