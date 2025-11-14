/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerCreateJobRegistryInput } from '@api/graphql';
import {
    QueueManagerCreateJobRegistryHandler,
    QueueManagerCreateJobRegistryResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobRegistryResolver', () => {
    let resolver: QueueManagerCreateJobRegistryResolver;
    let handler: QueueManagerCreateJobRegistryHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerCreateJobRegistryResolver,
                {
                    provide: QueueManagerCreateJobRegistryHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerCreateJobRegistryResolver>(
            QueueManagerCreateJobRegistryResolver,
        );
        handler = module.get<QueueManagerCreateJobRegistryHandler>(
            QueueManagerCreateJobRegistryHandler,
        );
    });

    test('QueueManagerCreateJobRegistryResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerCreateJobRegistryResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <QueueManagerCreateJobRegistryInput>(
                        queueManagerMockJobRegistryData[0]
                    ),
                ),
            ).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
