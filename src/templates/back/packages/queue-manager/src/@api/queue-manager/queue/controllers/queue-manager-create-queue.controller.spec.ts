import {
    QueueManagerCreateQueueController,
    QueueManagerCreateQueueHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueueController', () => {
    let controller: QueueManagerCreateQueueController;
    let handler: QueueManagerCreateQueueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [QueueManagerCreateQueueController],
            providers: [
                {
                    provide: QueueManagerCreateQueueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<QueueManagerCreateQueueController>(
            QueueManagerCreateQueueController,
        );
        handler = module.get<QueueManagerCreateQueueHandler>(
            QueueManagerCreateQueueHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerCreateQueueController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an queue created', async () => {
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
