/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateQueuesController } from './queue-manager-update-queues.controller';
import { QueueManagerUpdateQueuesHandler } from '../handlers/queue-manager-update-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerUpdateQueuesController', () =>
{
    let controller: QueueManagerUpdateQueuesController;
    let handler: QueueManagerUpdateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpdateQueuesController,
            ],
            providers: [
                {
                    provide : QueueManagerUpdateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpdateQueuesController>(QueueManagerUpdateQueuesController);
        handler = module.get<QueueManagerUpdateQueuesHandler>(QueueManagerUpdateQueuesHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a queues updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await controller.main(queues[0])).toBe(queues[0]);
        });
    });
});