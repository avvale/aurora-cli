/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerPaginateJobsRegistryResolver } from './queue-manager-paginate-jobs-registry.resolver';
import { QueueManagerPaginateJobsRegistryHandler } from '../handlers/queue-manager-paginate-jobs-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerPaginateJobsRegistryResolver', () =>
{
    let resolver: QueueManagerPaginateJobsRegistryResolver;
    let handler: QueueManagerPaginateJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerPaginateJobsRegistryResolver,
                {
                    provide : QueueManagerPaginateJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerPaginateJobsRegistryResolver>(QueueManagerPaginateJobsRegistryResolver);
        handler = module.get<QueueManagerPaginateJobsRegistryHandler>(QueueManagerPaginateJobsRegistryHandler);
    });

    test('QueueManagerPaginateJobsRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateJobsRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobsRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : jobsRegistry,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : jobsRegistry,
            });
        });
    });
});