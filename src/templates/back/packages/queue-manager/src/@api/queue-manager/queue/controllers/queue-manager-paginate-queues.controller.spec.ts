/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerPaginateQueuesController } from './queue-manager-paginate-queues.controller';
import { QueueManagerPaginateQueuesHandler } from '../handlers/queue-manager-paginate-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerPaginateQueuesController', () =>
{
    let controller: QueueManagerPaginateQueuesController;
    let handler: QueueManagerPaginateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerPaginateQueuesController,
            ],
            providers: [
                {
                    provide : QueueManagerPaginateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerPaginateQueuesController>(QueueManagerPaginateQueuesController);
        handler = module.get<QueueManagerPaginateQueuesHandler>(QueueManagerPaginateQueuesHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateQueuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a queues', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : queues,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : queues,
            });
        });
    });
});