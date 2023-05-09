/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobRegistryByIdController } from './queue-manager-find-job-registry-by-id.controller';
import { QueueManagerFindJobRegistryByIdHandler } from '../handlers/queue-manager-find-job-registry-by-id.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerFindJobRegistryByIdController', () =>
{
    let controller: QueueManagerFindJobRegistryByIdController;
    let handler: QueueManagerFindJobRegistryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerFindJobRegistryByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerFindJobRegistryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerFindJobRegistryByIdController>(QueueManagerFindJobRegistryByIdController);
        handler = module.get<QueueManagerFindJobRegistryByIdHandler>(QueueManagerFindJobRegistryByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobRegistry by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await controller.main(jobsRegistry[0].id)).toBe(jobsRegistry[0]);
        });
    });
});