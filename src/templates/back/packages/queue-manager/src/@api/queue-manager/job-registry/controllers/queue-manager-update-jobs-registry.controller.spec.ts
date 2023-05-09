/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateJobsRegistryController } from './queue-manager-update-jobs-registry.controller';
import { QueueManagerUpdateJobsRegistryHandler } from '../handlers/queue-manager-update-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main(jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});