import { QueueManagerUpsertJobRegistryController, QueueManagerUpsertJobRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertJobRegistryController', () =>
{
    let controller: QueueManagerUpsertJobRegistryController;
    let handler: QueueManagerUpsertJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpsertJobRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerUpsertJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpsertJobRegistryController>(QueueManagerUpsertJobRegistryController);
        handler = module.get<QueueManagerUpsertJobRegistryHandler>(QueueManagerUpsertJobRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertJobRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobRegistry upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await controller.main(queueManagerMockJobRegistryData[0])).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
