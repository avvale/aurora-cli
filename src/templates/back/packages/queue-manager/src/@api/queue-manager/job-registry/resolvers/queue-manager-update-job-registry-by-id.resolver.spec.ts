/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import {
    QueueManagerUpdateJobRegistryByIdHandler,
    QueueManagerUpdateJobRegistryByIdResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobRegistryByIdResolver', () => {
    let resolver: QueueManagerUpdateJobRegistryByIdResolver;
    let handler: QueueManagerUpdateJobRegistryByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerUpdateJobRegistryByIdResolver,
                {
                    provide: QueueManagerUpdateJobRegistryByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerUpdateJobRegistryByIdResolver>(
            QueueManagerUpdateJobRegistryByIdResolver,
        );
        handler = module.get<QueueManagerUpdateJobRegistryByIdHandler>(
            QueueManagerUpdateJobRegistryByIdHandler,
        );
    });

    test('QueueManagerUpdateJobRegistryByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerUpdateJobRegistryByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a jobRegistry by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <QueueManagerUpdateJobRegistryByIdInput>(
                        queueManagerMockJobRegistryData[0]
                    ),
                ),
            ).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
