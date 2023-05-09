/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateQueueByIdController } from './queue-manager-update-queue-by-id.controller';
import { QueueManagerUpdateQueueByIdHandler } from '../handlers/queue-manager-update-queue-by-id.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerUpdateQueueByIdController', () =>
{
    let controller: QueueManagerUpdateQueueByIdController;
    let handler: QueueManagerUpdateQueueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpdateQueueByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerUpdateQueueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpdateQueueByIdController>(QueueManagerUpdateQueueByIdController);
        handler = module.get<QueueManagerUpdateQueueByIdHandler>(QueueManagerUpdateQueueByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueueByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a queue updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await controller.main(queues[0])).toBe(queues[0]);
        });
    });
});