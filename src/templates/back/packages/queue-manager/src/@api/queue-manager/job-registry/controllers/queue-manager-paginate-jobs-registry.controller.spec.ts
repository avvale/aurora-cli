import { QueueManagerPaginateJobsRegistryController, QueueManagerPaginateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateJobsRegistryController', () =>
{
    let controller: QueueManagerPaginateJobsRegistryController;
    let handler: QueueManagerPaginateJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerPaginateJobsRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerPaginateJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerPaginateJobsRegistryController>(QueueManagerPaginateJobsRegistryController);
        handler = module.get<QueueManagerPaginateJobsRegistryHandler>(QueueManagerPaginateJobsRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateJobsRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a queueManagerMockJobRegistryData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : queueManagerMockJobRegistryData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : queueManagerMockJobRegistryData,
            });
        });
    });
});
