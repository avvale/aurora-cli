import { QueueManagerFindJobRegistryController, QueueManagerFindJobRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryController', () =>
{
    let controller: QueueManagerFindJobRegistryController;
    let handler: QueueManagerFindJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerFindJobRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerFindJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerFindJobRegistryController>(QueueManagerFindJobRegistryController);
        handler = module.get<QueueManagerFindJobRegistryHandler>(QueueManagerFindJobRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await controller.main()).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
