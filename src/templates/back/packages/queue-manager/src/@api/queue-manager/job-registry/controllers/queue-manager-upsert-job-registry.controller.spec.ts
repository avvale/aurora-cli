/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpsertJobRegistryController } from './queue-manager-upsert-job-registry.controller';
import { QueueManagerUpsertJobRegistryHandler } from '../handlers/queue-manager-upsert-job-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerUpsertJobRegistryController', () =>
{
    let controller: QueueManagerUpsertJobRegistryController;
    let handler: QueueManagerUpsertJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpsertJobRegistryController,
            ],
            providers: [
                {
                    provide : QueueManagerUpsertJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpsertJobRegistryController>(QueueManagerUpsertJobRegistryController);
        handler = module.get<QueueManagerUpsertJobRegistryHandler>(QueueManagerUpsertJobRegistryHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertJobRegistryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobRegistry upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main(jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});