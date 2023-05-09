/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteJobRegistryByIdController } from './queue-manager-delete-job-registry-by-id.controller';
import { QueueManagerDeleteJobRegistryByIdHandler } from '../handlers/queue-manager-delete-job-registry-by-id.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main(jobsRegistry[0].id)).toBe(jobsRegistry[0]);
        });
    });
});