/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerPaginateJobsHandler } from './queue-manager-paginate-jobs.handler';

// sources
// import { jobs } from '@app/queue-manager/job/infrastructure/mock/mock-job.data';

describe('QueueManagerPaginateJobsHandler', () =>
{
    let handler: QueueManagerPaginateJobsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerPaginateJobsHandler,
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

        handler = module.get<QueueManagerPaginateJobsHandler>(QueueManagerPaginateJobsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerPaginateJobsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateJobsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a jobs', async () =>
        {
            /* jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: jobs.length,
                count: jobs.length,
                rows : jobs,
            })));
            expect(await handler.main()).toEqual({
                total: jobs.length,
                count: jobs.length,
                rows : jobs,
            }); */
        });
    });
});