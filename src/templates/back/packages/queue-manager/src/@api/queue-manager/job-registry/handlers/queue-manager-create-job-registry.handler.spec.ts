/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerCreateJobRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobRegistryHandler', () =>
{
    let handler: QueueManagerCreateJobRegistryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerCreateJobRegistryHandler,
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

        handler = module.get<QueueManagerCreateJobRegistryHandler>(QueueManagerCreateJobRegistryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobRegistryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an jobRegistry created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(
                await handler.main(
                    queueManagerMockJobRegistryData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
