/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateQueueController } from './queue-manager-create-queue.controller';
import { QueueManagerCreateQueueHandler } from '../handlers/queue-manager-create-queue.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerCreateQueueController', () =>
{
    let controller: QueueManagerCreateQueueController;
    let handler: QueueManagerCreateQueueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerCreateQueueController,
            ],
            providers: [
                {
                    provide : QueueManagerCreateQueueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerCreateQueueController>(QueueManagerCreateQueueController);
        handler = module.get<QueueManagerCreateQueueHandler>(QueueManagerCreateQueueHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueueController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an queue created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await controller.main(queues[0])).toBe(queues[0]);
        });
    });
});