/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerDeleteJobsRegistryHandler } from './queue-manager-delete-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerDeleteJobsRegistryHandler', () =>
{
    let handler: QueueManagerDeleteJobsRegistryHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteJobsRegistryHandler,
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

        handler = module.get<QueueManagerDeleteJobsRegistryHandler>(QueueManagerDeleteJobsRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerDeleteJobsRegistryHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobsRegistryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an jobsRegistry deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry)));
            expect(await handler.main()).toBe(jobsRegistry);
        });
    });
});