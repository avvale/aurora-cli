import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateJobsRegistryResolver } from './queue-manager-create-jobs-registry.resolver';
import { QueueManagerCreateJobsRegistryHandler } from '../handlers/queue-manager-create-jobs-registry.handler';
import { QueueManagerCreateJobRegistryInput } from '@api/graphql';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerCreateJobsRegistryResolver', () =>
{
    let resolver: QueueManagerCreateJobsRegistryResolver;
    let handler: QueueManagerCreateJobsRegistryHandler;

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
        handler = module.get<QueueManagerCreateJobsRegistryHandler>(QueueManagerCreateJobsRegistryHandler);
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
            expect(await resolver.main(<QueueManagerCreateJobRegistryInput[]>jobsRegistry)).toBe(undefined);
        });
    });
});