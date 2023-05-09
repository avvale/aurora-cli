/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpsertJobRegistryResolver } from './queue-manager-upsert-job-registry.resolver';
import { QueueManagerUpsertJobRegistryHandler } from '../handlers/queue-manager-upsert-job-registry.handler';
import { QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerUpsertJobRegistryResolver', () =>
{
    let resolver: QueueManagerUpsertJobRegistryResolver;
    let handler: QueueManagerUpsertJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpsertJobRegistryResolver,
                {
                    provide : QueueManagerUpsertJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpsertJobRegistryResolver>(QueueManagerUpsertJobRegistryResolver);
        handler = module.get<QueueManagerUpsertJobRegistryHandler>(QueueManagerUpsertJobRegistryHandler);
    });

    test('QueueManagerUpsertJobRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertJobRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main(<QueueManagerUpdateJobRegistryByIdInput>jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});