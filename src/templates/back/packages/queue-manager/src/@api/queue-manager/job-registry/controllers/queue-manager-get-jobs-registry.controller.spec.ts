/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerGetJobsRegistryController } from './queue-manager-get-jobs-registry.controller';
import { QueueManagerGetJobsRegistryHandler } from '../handlers/queue-manager-get-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerGetJobsRegistryController', () =>
{
    let controller: QueueManagerGetJobsRegistryController;
    let handler: QueueManagerGetJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerGetJobsRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerGetJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerGetJobsRegistryController>(QueueManagerGetJobsRegistryController);
        handler = module.get<QueueManagerGetJobsRegistryHandler>(QueueManagerGetJobsRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerGetJobsRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobsRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry)));
            expect(await controller.main()).toBe(jobsRegistry);
        });
    });
});