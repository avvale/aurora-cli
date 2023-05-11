/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerFindJobRegistryHandler } from './queue-manager-find-job-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerFindJobRegistryHandler', () =>
{
    let handler: QueueManagerFindJobRegistryHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindJobRegistryHandler,
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

        handler = module.get<QueueManagerFindJobRegistryHandler>(QueueManagerFindJobRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerFindJobRegistryHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a jobRegistry', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await handler.main()).toBe(jobsRegistry[0]);
        });
    });
});