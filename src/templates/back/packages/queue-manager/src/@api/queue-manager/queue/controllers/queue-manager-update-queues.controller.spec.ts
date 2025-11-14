import {
    QueueManagerUpdateQueuesController,
    QueueManagerUpdateQueuesHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueuesController', () => {
    let controller: QueueManagerUpdateQueuesController;
    let handler: QueueManagerUpdateQueuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [QueueManagerUpdateQueuesController],
            providers: [
                {
                    provide: QueueManagerUpdateQueuesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<QueueManagerUpdateQueuesController>(
            QueueManagerUpdateQueuesController,
        );
        handler = module.get<QueueManagerUpdateQueuesHandler>(
            QueueManagerUpdateQueuesHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerUpdateQueuesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a queues updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockQueueData[0]),
                    ),
            );
            expect(await controller.main(queueManagerMockQueueData[0])).toBe(
                queueManagerMockQueueData[0],
            );
        });
    });
});
