/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpsertJobRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertJobRegistryHandler', () =>
{
    let handler: QueueManagerUpsertJobRegistryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpsertJobRegistryHandler,
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

        handler = module.get<QueueManagerUpsertJobRegistryHandler>(QueueManagerUpsertJobRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertJobRegistryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an jobRegistry upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(
                await handler.main(
                    queueManagerMockJobRegistryData[0],
                    'Europe/Madrid',
                ))
                .toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
