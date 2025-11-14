import {
    QueueManagerCreateJobsRegistryController,
    QueueManagerCreateJobsRegistryHandler,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobsRegistryController', () => {
    let controller: QueueManagerCreateJobsRegistryController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QueueManagerCreateJobsRegistryController],
            providers: [
                {
                    provide: QueueManagerCreateJobsRegistryHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<QueueManagerCreateJobsRegistryController>(
            QueueManagerCreateJobsRegistryController,
        );
    });

    describe('main', () => {
        test('QueueManagerCreateJobsRegistryController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an queueManagerMockJobRegistryData created', async () => {
            expect(await controller.main(queueManagerMockJobRegistryData)).toBe(
                undefined,
            );
        });
    });
});
