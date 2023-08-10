import { QueueManagerCreateJobRegistryInput } from '@api/graphql';
import { QueueManagerCreateJobsRegistryHandler, QueueManagerCreateJobsRegistryResolver } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobsRegistryResolver', () =>
{
    let resolver: QueueManagerCreateJobsRegistryResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateJobsRegistryResolver,
                {
                    provide : QueueManagerCreateJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerCreateJobsRegistryResolver>(QueueManagerCreateJobsRegistryResolver);
    });

    test('QueueManagerCreateJobsRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobsRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobsRegistry created', async () =>
        {
            expect(await resolver.main(<QueueManagerCreateJobRegistryInput[]>queueManagerMockJobRegistryData)).toBe(undefined);
        });
    });
});
