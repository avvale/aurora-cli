import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateJobsRegistryController } from './queue-manager-create-jobs-registry.controller';
import { QueueManagerCreateJobsRegistryHandler } from '../handlers/queue-manager-create-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerCreateJobsRegistryController', () =>
{
    let controller: QueueManagerCreateJobsRegistryController;
    let handler: QueueManagerCreateJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                QueueManagerCreateJobsRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerCreateJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerCreateJobsRegistryController>(QueueManagerCreateJobsRegistryController);
        handler = module.get<QueueManagerCreateJobsRegistryHandler>(QueueManagerCreateJobsRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobsRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsRegistry created', async () =>
        {
            expect(await controller.main(jobsRegistry)).toBe(undefined);
        });
    });
});