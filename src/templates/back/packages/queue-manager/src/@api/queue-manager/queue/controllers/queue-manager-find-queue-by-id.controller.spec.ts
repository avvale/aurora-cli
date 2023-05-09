/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindQueueByIdController } from './queue-manager-find-queue-by-id.controller';
import { QueueManagerFindQueueByIdHandler } from '../handlers/queue-manager-find-queue-by-id.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerFindQueueByIdController', () =>
{
    let controller: QueueManagerFindQueueByIdController;
    let handler: QueueManagerFindQueueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerFindQueueByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerFindQueueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerFindQueueByIdController>(QueueManagerFindQueueByIdController);
        handler = module.get<QueueManagerFindQueueByIdHandler>(QueueManagerFindQueueByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an queue by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await controller.main(queues[0].id)).toBe(queues[0]);
        });
    });
});