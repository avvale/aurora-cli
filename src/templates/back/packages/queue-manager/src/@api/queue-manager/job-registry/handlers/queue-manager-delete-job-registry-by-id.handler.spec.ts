/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobRegistryByIdController', () => {
    let handler: QueueManagerDeleteJobRegistryByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerDeleteJobRegistryByIdHandler,
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

        handler = module.get<QueueManagerDeleteJobRegistryByIdHandler>(
            QueueManagerDeleteJobRegistryByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('QueueManagerDeleteJobRegistryByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an jobRegistry deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData[0]),
                    ),
            );
            expect(
                await handler.main(
                    queueManagerMockJobRegistryData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
