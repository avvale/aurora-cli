import {
    QueueManagerFindQueueController,
    QueueManagerFindQueueHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueController', () => {
    let controller: QueueManagerFindQueueController;
    let handler: QueueManagerFindQueueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [QueueManagerFindQueueController],
            providers: [
                {
                    provide: QueueManagerFindQueueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<QueueManagerFindQueueController>(
            QueueManagerFindQueueController,
        );
        handler = module.get<QueueManagerFindQueueHandler>(
            QueueManagerFindQueueHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerFindQueueController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a queue', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockQueueData[0]),
                    ),
            );
            expect(await controller.main()).toBe(queueManagerMockQueueData[0]);
        });
    });
});
