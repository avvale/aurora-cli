/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerGetJobsRegistryHandler,
    QueueManagerGetJobsRegistryResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetJobsRegistryResolver', () => {
    let resolver: QueueManagerGetJobsRegistryResolver;
    let handler: QueueManagerGetJobsRegistryHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerGetJobsRegistryResolver,
                {
                    provide: QueueManagerGetJobsRegistryHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerGetJobsRegistryResolver>(
            QueueManagerGetJobsRegistryResolver,
        );
        handler = module.get<QueueManagerGetJobsRegistryHandler>(
            QueueManagerGetJobsRegistryHandler,
        );
    });

    test('QueueManagerGetJobsRegistryResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerGetJobsRegistryResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a queueManagerMockJobRegistryData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData),
                    ),
            );
            expect(await resolver.main()).toBe(queueManagerMockJobRegistryData);
        });
    });
});
