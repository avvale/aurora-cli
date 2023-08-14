/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindJobRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryHandler', () =>
{
    let handler: QueueManagerFindJobRegistryHandler;
    let queryBus: IQueryBus;

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
            ],
        })
            .compile();

        handler = module.get<QueueManagerFindJobRegistryHandler>(QueueManagerFindJobRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
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
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
