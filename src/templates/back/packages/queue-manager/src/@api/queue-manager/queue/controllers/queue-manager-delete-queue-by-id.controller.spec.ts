/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteQueueByIdController, QueueManagerDeleteQueueByIdHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueueByIdController', () =>
{
    let controller: QueueManagerDeleteQueueByIdController;
    let handler: QueueManagerDeleteQueueByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerDeleteQueueByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerDeleteQueueByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerDeleteQueueByIdController>(QueueManagerDeleteQueueByIdController);
        handler = module.get<QueueManagerDeleteQueueByIdHandler>(QueueManagerDeleteQueueByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueueByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an queue deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(await controller.main(queueManagerMockQueueData[0].id)).toBe(queueManagerMockQueueData[0]);
        });
    });
});
