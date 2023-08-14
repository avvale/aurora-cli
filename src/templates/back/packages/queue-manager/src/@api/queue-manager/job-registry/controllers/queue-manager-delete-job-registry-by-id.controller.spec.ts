/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteJobRegistryByIdController, QueueManagerDeleteJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobRegistryByIdController', () =>
{
    let controller: QueueManagerDeleteJobRegistryByIdController;
    let handler: QueueManagerDeleteJobRegistryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerDeleteJobRegistryByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerDeleteJobRegistryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerDeleteJobRegistryByIdController>(QueueManagerDeleteJobRegistryByIdController);
        handler = module.get<QueueManagerDeleteJobRegistryByIdHandler>(QueueManagerDeleteJobRegistryByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobRegistryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobRegistry deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await controller.main(queueManagerMockJobRegistryData[0].id)).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
