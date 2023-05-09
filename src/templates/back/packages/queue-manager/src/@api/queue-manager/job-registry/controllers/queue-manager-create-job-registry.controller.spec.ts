/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateJobRegistryController } from './queue-manager-create-job-registry.controller';
import { QueueManagerCreateJobRegistryHandler } from '../handlers/queue-manager-create-job-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerCreateJobRegistryController', () =>
{
    let controller: QueueManagerCreateJobRegistryController;
    let handler: QueueManagerCreateJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerCreateJobRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerCreateJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerCreateJobRegistryController>(QueueManagerCreateJobRegistryController);
        handler = module.get<QueueManagerCreateJobRegistryHandler>(QueueManagerCreateJobRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobRegistry created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main(jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});