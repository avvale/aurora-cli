/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerGetJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetJobsRegistryHandler', () => {
    let handler: QueueManagerGetJobsRegistryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerGetJobsRegistryHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<QueueManagerGetJobsRegistryHandler>(
            QueueManagerGetJobsRegistryHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('QueueManagerGetJobsRegistryHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerGetJobsRegistryHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a queueManagerMockJobRegistryData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                queueManagerMockJobRegistryData,
            );
        });
    });
});
