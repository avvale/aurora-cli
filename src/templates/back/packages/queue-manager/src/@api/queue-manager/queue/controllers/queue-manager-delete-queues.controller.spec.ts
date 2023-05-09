/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteQueuesController } from './queue-manager-delete-queues.controller';
import { QueueManagerDeleteQueuesHandler } from '../handlers/queue-manager-delete-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerDeleteQueuesController', () =>
{
    let controller: QueueManagerDeleteQueuesController;
    let handler: QueueManagerDeleteQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerDeleteQueuesController,
            ],
            providers: [
                {
                    provide : QueueManagerDeleteQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerDeleteQueuesController>(QueueManagerDeleteQueuesController);
        handler = module.get<QueueManagerDeleteQueuesHandler>(QueueManagerDeleteQueuesHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an queues deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues)));
            expect(await controller.main()).toBe(queues);
        });
    });
});