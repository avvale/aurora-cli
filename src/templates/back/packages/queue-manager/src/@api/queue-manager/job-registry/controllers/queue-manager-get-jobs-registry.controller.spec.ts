import {
    QueueManagerGetJobsRegistryController,
    QueueManagerGetJobsRegistryHandler,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetJobsRegistryController', () => {
    let controller: QueueManagerGetJobsRegistryController;
    let handler: QueueManagerGetJobsRegistryHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [QueueManagerGetJobsRegistryController],
            providers: [
                {
                    provide: QueueManagerGetJobsRegistryHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<QueueManagerGetJobsRegistryController>(
            QueueManagerGetJobsRegistryController,
        );
        handler = module.get<QueueManagerGetJobsRegistryHandler>(
            QueueManagerGetJobsRegistryHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerGetJobsRegistryController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a queueManagerMockJobRegistryData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData),
                    ),
            );
            expect(await controller.main()).toBe(
                queueManagerMockJobRegistryData,
            );
        });
    });
});
