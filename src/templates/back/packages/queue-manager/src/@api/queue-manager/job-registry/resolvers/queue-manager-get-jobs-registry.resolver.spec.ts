/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerGetJobsRegistryResolver } from './queue-manager-get-jobs-registry.resolver';
import { QueueManagerGetJobsRegistryHandler } from '../handlers/queue-manager-get-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerGetJobsRegistryResolver', () =>
{
    let resolver: QueueManagerGetJobsRegistryResolver;
    let handler: QueueManagerGetJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerGetJobsRegistryResolver,
                {
                    provide : QueueManagerGetJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerGetJobsRegistryResolver>(QueueManagerGetJobsRegistryResolver);
        handler = module.get<QueueManagerGetJobsRegistryHandler>(QueueManagerGetJobsRegistryHandler);
    });

    test('QueueManagerGetJobsRegistryResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerGetJobsRegistryResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a jobsRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry)));
            expect(await resolver.main()).toBe(jobsRegistry);
        });
    });
});