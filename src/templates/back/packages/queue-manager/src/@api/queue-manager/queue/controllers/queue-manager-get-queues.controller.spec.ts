/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerGetQueuesController } from './queue-manager-get-queues.controller';
import { QueueManagerGetQueuesHandler } from '../handlers/queue-manager-get-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerGetQueuesController', () =>
{
    let controller: QueueManagerGetQueuesController;
    let handler: QueueManagerGetQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerGetQueuesController,
            ],
            providers: [
                {
                    provide : QueueManagerGetQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerGetQueuesController>(QueueManagerGetQueuesController);
        handler = module.get<QueueManagerGetQueuesHandler>(QueueManagerGetQueuesHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerGetQueuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a queues', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues)));
            expect(await controller.main()).toBe(queues);
        });
    });
});