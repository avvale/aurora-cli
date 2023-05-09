/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobRegistryController } from './queue-manager-find-job-registry.controller';
import { QueueManagerFindJobRegistryHandler } from '../handlers/queue-manager-find-job-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerFindJobRegistryController', () =>
{
    let controller: QueueManagerFindJobRegistryController;
    let handler: QueueManagerFindJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerFindJobRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerFindJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerFindJobRegistryController>(QueueManagerFindJobRegistryController);
        handler = module.get<QueueManagerFindJobRegistryHandler>(QueueManagerFindJobRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main()).toBe(jobsRegistry[0]);
        });
    });
});