import {
    QueueManagerDeleteQueuesController,
    QueueManagerDeleteQueuesHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueuesController', () => {
    let controller: QueueManagerDeleteQueuesController;
    let handler: QueueManagerDeleteQueuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [QueueManagerDeleteQueuesController],
            providers: [
                {
                    provide: QueueManagerDeleteQueuesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<QueueManagerDeleteQueuesController>(
            QueueManagerDeleteQueuesController,
        );
        handler = module.get<QueueManagerDeleteQueuesHandler>(
            QueueManagerDeleteQueuesHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerDeleteQueuesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an queueManagerMockQueueData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockQueueData),
                    ),
            );
            expect(await controller.main()).toBe(queueManagerMockQueueData);
        });
    });
});
