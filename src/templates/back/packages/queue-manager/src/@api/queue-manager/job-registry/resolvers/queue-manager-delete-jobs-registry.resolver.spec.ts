/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteJobsRegistryResolver } from './queue-manager-delete-jobs-registry.resolver';
import { QueueManagerDeleteJobsRegistryHandler } from '../handlers/queue-manager-delete-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

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

        test('should return an jobsRegistry deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry)));
            expect(await resolver.main()).toBe(jobsRegistry);
        });
    });
});