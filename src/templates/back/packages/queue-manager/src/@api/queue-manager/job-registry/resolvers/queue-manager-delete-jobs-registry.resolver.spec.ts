/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteJobsRegistryHandler, QueueManagerDeleteJobsRegistryResolver } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobsRegistryResolver', () =>
{
    let resolver: QueueManagerDeleteJobsRegistryResolver;
    let handler: QueueManagerDeleteJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteJobsRegistryResolver,
                {
                    provide : QueueManagerDeleteJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerDeleteJobsRegistryResolver>(QueueManagerDeleteJobsRegistryResolver);
        handler = module.get<QueueManagerDeleteJobsRegistryHandler>(QueueManagerDeleteJobsRegistryHandler);
    });

    test('QueueManagerDeleteJobsRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobsRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an queueManagerMockJobRegistryData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData)));
            expect(await resolver.main()).toBe(queueManagerMockJobRegistryData);
        });
    });
});
