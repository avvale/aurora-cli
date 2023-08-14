import { QueueManagerUpdateJobsRegistryController, QueueManagerUpdateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobsRegistryController', () =>
{
    let controller: QueueManagerUpdateJobsRegistryController;
    let handler: QueueManagerUpdateJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpdateJobsRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerUpdateJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpdateJobsRegistryController>(QueueManagerUpdateJobsRegistryController);
        handler = module.get<QueueManagerUpdateJobsRegistryHandler>(QueueManagerUpdateJobsRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateJobsRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobsRegistry updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await controller.main(queueManagerMockJobRegistryData[0])).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
