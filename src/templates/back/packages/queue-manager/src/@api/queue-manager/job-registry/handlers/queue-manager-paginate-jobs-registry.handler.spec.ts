/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerPaginateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateJobsRegistryHandler', () =>
{
    let handler: QueueManagerPaginateJobsRegistryHandler;
    let queryBus: IQueryBus;

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
            ],
        })
            .compile();

        handler = module.get<QueueManagerPaginateJobsRegistryHandler>(QueueManagerPaginateJobsRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
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
                total: queueManagerMockJobRegistryData.length,
                count: queueManagerMockJobRegistryData.length,
                rows : queueManagerMockJobRegistryData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: queueManagerMockJobRegistryData.length,
                    count: queueManagerMockJobRegistryData.length,
                    rows : queueManagerMockJobRegistryData,
                });
        });
    });
});
