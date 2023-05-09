/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateJobsRegistryResolver } from './queue-manager-update-jobs-registry.resolver';
import { QueueManagerUpdateJobsRegistryHandler } from '../handlers/queue-manager-update-jobs-registry.handler';
import { QueueManagerUpdateJobsRegistryInput } from '@api/graphql';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerUpdateJobsRegistryResolver', () =>
{
    let resolver: QueueManagerUpdateJobsRegistryResolver;
    let handler: QueueManagerUpdateJobsRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpdateJobsRegistryResolver,
                {
                    provide : QueueManagerUpdateJobsRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpdateJobsRegistryResolver>(QueueManagerUpdateJobsRegistryResolver);
        handler = module.get<QueueManagerUpdateJobsRegistryHandler>(QueueManagerUpdateJobsRegistryHandler);
    });

    test('QueueManagerUpdateJobsRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateJobsRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobsRegistry updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main(<QueueManagerUpdateJobsRegistryInput>jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});