/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerPaginateJobsRegistryController } from './queue-manager-paginate-jobs-registry.controller';
import { QueueManagerPaginateJobsRegistryHandler } from '../handlers/queue-manager-paginate-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

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

        test('should return a jobsRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : jobsRegistry,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : jobsRegistry,
            });
        });
    });
});