/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpdateJobRegistryByIdResolver } from './queue-manager-update-job-registry-by-id.resolver';
import { QueueManagerUpdateJobRegistryByIdHandler } from '../handlers/queue-manager-update-job-registry-by-id.handler';
import { QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerUpdateJobRegistryByIdResolver', () =>
{
    let resolver: QueueManagerUpdateJobRegistryByIdResolver;
    let handler: QueueManagerUpdateJobRegistryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpdateJobRegistryByIdResolver,
                {
                    provide : QueueManagerUpdateJobRegistryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpdateJobRegistryByIdResolver>(QueueManagerUpdateJobRegistryByIdResolver);
        handler = module.get<QueueManagerUpdateJobRegistryByIdHandler>(QueueManagerUpdateJobRegistryByIdHandler);
    });

    test('QueueManagerUpdateJobRegistryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateJobRegistryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobRegistry by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main(<QueueManagerUpdateJobRegistryByIdInput>jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});