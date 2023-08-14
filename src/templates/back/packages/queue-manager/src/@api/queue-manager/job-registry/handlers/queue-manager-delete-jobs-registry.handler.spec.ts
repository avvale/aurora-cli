/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobsRegistryHandler', () =>
{
    let handler: QueueManagerDeleteJobsRegistryHandler;
    let queryBus: IQueryBus;

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

        test('should return an queueManagerMockJobRegistryData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(queueManagerMockJobRegistryData);
        });
    });
});
