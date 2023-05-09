/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateJobRegistryByIdController } from './queue-manager-update-job-registry-by-id.controller';
import { QueueManagerUpdateJobRegistryByIdHandler } from '../handlers/queue-manager-update-job-registry-by-id.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main(jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});