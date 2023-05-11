/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerPaginateJobsRegistryHandler } from './queue-manager-paginate-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerPaginateJobsRegistryHandler', () =>
{
    let handler: QueueManagerPaginateJobsRegistryHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerPaginateJobsRegistryHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<QueueManagerPaginateJobsRegistryHandler>(QueueManagerPaginateJobsRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerPaginateJobsRegistryHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateJobsRegistryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a jobsRegistry', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: jobsRegistry.length,
                count: jobsRegistry.length,
                rows : jobsRegistry,
            })));
            expect(await handler.main()).toEqual({
                total: jobsRegistry.length,
                count: jobsRegistry.length,
                rows : jobsRegistry,
            });
        });
    });
});