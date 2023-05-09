/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteJobsRegistryController } from './queue-manager-delete-jobs-registry.controller';
import { QueueManagerDeleteJobsRegistryHandler } from '../handlers/queue-manager-delete-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerDeleteJobsRegistryController', () =>
{
    let controller: QueueManagerDeleteJobsRegistryController;
    let handler: QueueManagerDeleteJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerDeleteJobsRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerDeleteJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerDeleteJobsRegistryController>(QueueManagerDeleteJobsRegistryController);
        handler = module.get<QueueManagerDeleteJobsRegistryHandler>(QueueManagerDeleteJobsRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobsRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsRegistry deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry)));
            expect(await controller.main()).toBe(jobsRegistry);
        });
    });
});