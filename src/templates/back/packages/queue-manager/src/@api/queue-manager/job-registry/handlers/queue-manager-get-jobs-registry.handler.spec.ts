/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerGetJobsRegistryHandler } from './queue-manager-get-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerGetJobsRegistryHandler', () =>
{
    let handler: QueueManagerGetJobsRegistryHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerGetJobsRegistryHandler,
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

        handler = module.get<QueueManagerGetJobsRegistryHandler>(QueueManagerGetJobsRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerGetJobsRegistryHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerGetJobsRegistryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a jobsRegistry', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry)));
            expect(await handler.main()).toBe(jobsRegistry);
        });
    });
});