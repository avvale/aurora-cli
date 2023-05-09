/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindQueueController } from './queue-manager-find-queue.controller';
import { QueueManagerFindQueueHandler } from '../handlers/queue-manager-find-queue.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerFindQueueController', () =>
{
    let controller: QueueManagerFindQueueController;
    let handler: QueueManagerFindQueueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerFindQueueController,
            ],
            providers: [
                {
                    provide : QueueManagerFindQueueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerFindQueueController>(QueueManagerFindQueueController);
        handler = module.get<QueueManagerFindQueueHandler>(QueueManagerFindQueueHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a queue', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await controller.main()).toBe(queues[0]);
        });
    });
});