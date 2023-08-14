import { QueueManagerUpdateJobRegistryByIdController, QueueManagerUpdateJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobRegistryByIdController', () =>
{
    let controller: QueueManagerUpdateJobRegistryByIdController;
    let handler: QueueManagerUpdateJobRegistryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpdateJobRegistryByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerUpdateJobRegistryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpdateJobRegistryByIdController>(QueueManagerUpdateJobRegistryByIdController);
        handler = module.get<QueueManagerUpdateJobRegistryByIdHandler>(QueueManagerUpdateJobRegistryByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateJobRegistryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobRegistry updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await controller.main(queueManagerMockJobRegistryData[0])).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
