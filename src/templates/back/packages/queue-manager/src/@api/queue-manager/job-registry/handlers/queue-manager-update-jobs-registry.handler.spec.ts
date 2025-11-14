/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateJobsRegistryInput } from '@api/graphql';
import { QueueManagerUpdateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobsRegistryHandler', () => {
    let handler: QueueManagerUpdateJobsRegistryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerUpdateJobsRegistryHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<QueueManagerUpdateJobsRegistryHandler>(
            QueueManagerUpdateJobsRegistryHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerUpdateJobsRegistryHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerUpdateJobsRegistryHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a jobsRegistry updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <QueueManagerUpdateJobsRegistryInput>(
                        queueManagerMockJobRegistryData[0]
                    ),
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
