/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerFindJobByIdHandler } from './queue-manager-find-job-by-id.handler';

// sources
import { jobs } from '@app/queue-manager/job/infrastructure/mock/mock-job.data';

describe('QueueManagerFindJobByIdHandler', () =>
{
    let handler: QueueManagerFindJobByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindJobByIdHandler,
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

        handler = module.get<QueueManagerFindJobByIdHandler>(QueueManagerFindJobByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerFindJobByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an job by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobs[0])));
            expect(await handler.main(jobs[0].id)).toBe(jobs[0]);
        });
    });
});